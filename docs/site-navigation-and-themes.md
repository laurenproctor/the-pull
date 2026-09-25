# Navigation, appearance, and missing pages

- Dashboard logo links to `/`. The compact rail uses a small `p.` wordmark, never TP.
- Desktop navigation can collapse to an icon rail. Accessible names and native hover titles remain; the existing mobile drawer stays independent. `the-pull:sidebar:v1` saves the user's choice.
- Every primary, opportunity, and client sidebar tab has a functional SVG icon. Sidebar utility links have icons as well.
- Every HTML document includes site-shell.js and the shared shell/dark styles. The head initializer applies the stored light/dark preference before paint, otherwise follows prefers-color-scheme. Header switches expose their checked state. `the-pull:theme:v1` saves explicit choices.
- The dark stylesheet is generated from current source colors with Python's standard library: `python scripts/build-dark-theme.py`. It scopes color changes to html[data-theme="dark"], then applies intentional palette overrides. It does not invert photographs, videos, or charts. Regenerate after source stylesheet changes, and visually inspect affected screens.
- Netlify rewrites the exact supported dashboard routes to dashboard.html. Unknown paths, including unknown study IDs, receive the themed 404.html with HTTP 404. Add explicit valid routes when introducing pages; do not restore the all-paths 200 fallback.
- 404 retains the public navigation, privacy controls, theme switch, and consent-controlled BugHerd.
