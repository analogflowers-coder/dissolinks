# DISS0LINKZ

## What This Is
DISS0LINKZ is a cyberpunk link-in-bio SaaS platform. Static site
on GitHub Pages. Firebase Auth + Firestore for data. No backend
server. Everything client-side except Cloud Functions.

Domain: diss0links.com (primary), links.dissoverse.com (redirect)
Repo: analogflowers-coder/dissolinks
Hosting: GitHub Pages (auto-deploy on push to main)
Auth: Firebase Auth (email/password)
Database: Cloud Firestore
Owner: DISSOVERSE LLC (Bradley Bingham)

## Architecture
- / (index.html) -- Auth gate: boot sequence, INITIATE button, login/signup
- /settings/ -- Landing page builder with live preview (approved users only)
- /links/ -- Deep link engine / Force-Op tool (approved users only)
- /p/ -- Public landing page renderer (reads Firestore, public access)
- /admin/ -- Admin panel (GRANDMASTER only, UID + clearance code gated)
- /[slug]/ -- Bridge pages (static HTML redirects through Shopify go page)

## Key Files
- backgrounds.js -- 5 canvas animations (matrix, signal, hex, static, grid)
- DISSOLINK_MASTER_RULES.txt -- Bridge governance (DO NOT MODIFY)
- BRIDGE_HARDLOCK.txt -- Bridge protection rules (DO NOT MODIFY)
- FOREVER_LINKS.txt -- Permanent link registry (DO NOT DELETE ENTRIES)
- DISS0LINKZ_HARDLOCK.txt -- Sacred features list

## Mobile First
TARGET AUDIENCE IS 95% MOBILE. Every change must be tested at
375x812 viewport BEFORE pushing. If it breaks on mobile, it
does not ship. Period.

Critical mobile rules:
- body/html must have overflow:auto after INITIATE button tap
- Touch targets minimum 44x44px
- No fixed/absolute positioning that blocks scroll
- Font minimum 14px for body text
- Test in Chrome DevTools mobile emulator before every push

## Workflow
1. git pull origin main (ALWAYS pull before editing)
2. Plan mode for any change touching 3+ files
3. Read the file you are editing FULLY before making changes
4. GREP for mobile-specific CSS before touching any layout
5. Make the change (PATCH, do not rewrite entire sections)
6. Test at 375x812 in browser
7. git diff to verify only intended changes
8. Commit per-file (separate commits)
9. Push
10. Verify live in 90 seconds

## Lessons (update after every correction)
- NEVER rewrite entire sections. PATCH specific lines only.
- ALWAYS grep for existing mobile fixes before editing layout.
- ALWAYS verify overflow:auto on body after auth state changes.
- Background canvas must read from LIVE CSS variables every frame,
  not from a stale global set once at init.
- The INITIATE button appears ONCE. One creation point. One show point.
- Tailwind CDN is removed. All layout uses custom CSS only.
- Password minlength = 8 everywhere (HTML, JS, placeholder).
- Firebase only. No localStorage auth fallback. Ever.

## Commands
- Deploy: git add -A && git commit -m "CODE: [desc]" && git push origin main
- Theme push: npx shopify theme push --store thedissonance --live --only "file"
- Test: open Chrome DevTools, toggle device toolbar, select iPhone 13

## Do Not Touch (without GRANDMASTER approval)
1. Boot sequence animation
2. CNAME file
3. Bridge pages (all 7)
4. Firestore security rules
5. Admin UID hardcode
6. Admin clearance code hash
7. Domain redirect JS
8. Governance .txt files
