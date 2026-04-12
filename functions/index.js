const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();
const db = admin.firestore();

// ── GITHUB PAT PROXY ──────────────────────────────────────────
// Client sends link data → this function deploys to GitHub.
// PAT never touches the browser. Stored in Firebase config.
// Set with: firebase functions:config:set github.pat="ghp_xxx"
exports.deployLink = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');

  // Verify user is approved
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data().status !== 'approved') {
    throw new functions.https.HttpsError('permission-denied', 'Not approved');
  }

  const { slug, html } = data;
  if (!slug || !html) throw new functions.https.HttpsError('invalid-argument', 'slug and html required');

  const pat = functions.config().github.pat;
  if (!pat) throw new functions.https.HttpsError('internal', 'GitHub PAT not configured');

  const filename = slug + '/index.html';
  const apiUrl = 'https://api.github.com/repos/analogflowers-coder/dissolinks/contents/' + filename;
  const b64 = Buffer.from(html).toString('base64');

  // Check if file exists (need SHA to update)
  let sha = null;
  const checkResp = await fetch(apiUrl, {
    headers: { 'Authorization': 'Bearer ' + pat, 'Accept': 'application/vnd.github+json' }
  });
  if (checkResp.status === 200) {
    const existing = await checkResp.json();
    sha = existing.sha;
  }

  const body = { message: 'link: ' + slug, content: b64 };
  if (sha) body.sha = sha;

  const putResp = await fetch(apiUrl, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + pat, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github+json' },
    body: JSON.stringify(body)
  });

  if (putResp.status === 201 || putResp.status === 200) {
    const result = await putResp.json();
    // Save link record to Firestore
    const username = userDoc.data().username || context.auth.token.email.split('@')[0];
    await db.collection('users').doc(context.auth.uid).collection('links').doc(slug).set({
      slug: slug,
      created: admin.firestore.FieldValue.serverTimestamp(),
      active: true
    }, { merge: true });
    return { success: true, sha: result.commit.sha.substring(0, 7) };
  } else {
    const err = await putResp.json().catch(() => ({}));
    throw new functions.https.HttpsError('internal', 'Deploy failed: ' + (err.message || putResp.status));
  }
});

// ── DELETE LINK ───────────────────────────────────────────────
exports.deleteLink = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');

  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data().status !== 'approved') {
    throw new functions.https.HttpsError('permission-denied', 'Not approved');
  }

  const { slug } = data;
  if (!slug) throw new functions.https.HttpsError('invalid-argument', 'slug required');

  const pat = functions.config().github.pat;
  const fileUrl = 'https://api.github.com/repos/analogflowers-coder/dissolinks/contents/' + slug + '/index.html';

  const fileResp = await fetch(fileUrl, {
    headers: { 'Authorization': 'Bearer ' + pat, 'Accept': 'application/vnd.github+json' }
  });
  if (!fileResp.ok) throw new functions.https.HttpsError('not-found', 'Link not found');

  const fileData = await fileResp.json();
  const delResp = await fetch(fileUrl, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + pat, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github+json' },
    body: JSON.stringify({ message: 'delete: ' + slug, sha: fileData.sha })
  });

  if (delResp.ok) {
    await db.collection('users').doc(context.auth.uid).collection('links').doc(slug).delete();
    return { success: true };
  }
  throw new functions.https.HttpsError('internal', 'Delete failed');
});

// ── FETCH PAGE (for Linktree import) ──────────────────────────
exports.fetchPage = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }

  const url = req.query.url;
  if (!url || !url.match(/^https?:\/\//i)) {
    res.status(400).json({ error: 'Valid URL required' });
    return;
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Diss0LinkZ/1.0)' },
      timeout: 10000
    });
    const html = await response.text();
    res.send(html);
  } catch (e) {
    res.status(502).json({ error: 'Failed to fetch: ' + e.message });
  }
});
