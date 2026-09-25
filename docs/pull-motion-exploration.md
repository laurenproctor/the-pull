# Pull motion exploration

Implements the user's selection: option 1 combined with the attached opening from option 2. Static production architecture and Netlify routing are retained. Canonical marketing markup lives in `scripts/build-marketing.py`; rebuild with `python3 scripts/build-marketing.py`. Local preview: `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`.

The dependency-free preview server's `/__qa` route is a local responsive harness, not a production page. Netlify still publishes static files directly.

Baseline production commit: `bd4f004fac64b6a17c19b2152b56fb0d76b67311`.
Remote rollback branch: `archive/before-pull-motion-20260925`.
To reverse the exploration while preserving later work, revert the single commit titled `Explore The Pull with editorial photography and magnetic motion` and deploy the resulting main branch. Avoid resetting main over subsequent work.

New photo assets are conceptual editorial illustrations, not client work or founder portraits. The three WebPs total approximately 403 KB. All copy and controls remain HTML. Portrait attraction is scroll-driven; headings ease into alignment; CTA arrows follow the pointer within fixed hit areas. The footer motion preference persists locally and system reduced-motion overrides motion.

See `design-qa.md` for visual and interaction evidence.
