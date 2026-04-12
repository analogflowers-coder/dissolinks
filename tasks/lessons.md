# Lessons Learned

## Session 2026-04-11
- Rewrote auth gate section and removed mobile scroll fix.
  RULE: Never rewrite. Patch.
- INITIATE button appeared twice due to two code paths
  creating it. RULE: One creation point per element.
- Background canvas read stale color global instead of
  live CSS variable. RULE: Read CSS vars every frame.
- Tailwind classes left in HTML after CDN removed.
  RULE: When removing a dependency, grep for all usages.
- Landing page config not loading from Firestore.
  RULE: Console.log query results during development.
  Remove logs before push.
- Speed slider labels swapped. RULE: Test every interactive
  element manually after building it.

## Standing Rules
- Mobile scroll must work after every state change.
- Pull before edit. Diff before push.
- One task per commit. Descriptive message per file.
- If a fix feels hacky, implement the elegant solution.
- Never mark done without proving it works on mobile.
