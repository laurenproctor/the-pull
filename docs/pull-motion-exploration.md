# Pull motion exploration

Implements the user's selection: option 1 combined with the attached opening from option 2. Static production architecture and Netlify routing are retained. Canonical marketing markup lives in `scripts/build-marketing.py`; rebuild with `python3 scripts/build-marketing.py`. Local preview: `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`.

The dependency-free preview server's `/__qa` route is a local responsive harness, not a production page. Netlify still publishes static files directly.

Baseline production commit: `bd4f004fac64b6a17c19b2152b56fb0d76b67311`.
Remote rollback branch: `archive/before-pull-motion-20260925`.
To reverse the exploration while preserving later work, revert the single commit titled `Explore The Pull with editorial photography and magnetic motion` and deploy the resulting main branch. Avoid resetting main over subsequent work.

New photo assets are conceptual editorial illustrations, not client work or founder portraits. The three WebPs total approximately 403 KB. All copy and controls remain HTML. Portrait attraction is scroll-driven; headings ease into alignment; CTA arrows follow the pointer within fixed hit areas. The footer motion preference persists locally and system reduced-motion overrides motion.

See `design-qa.md` for visual and interaction evidence.

## September 25: attraction and release

The shared motion script now includes scroll-driven portrait attraction, converging section headings/rules, spring-based arrow and wordmark movement, and an elastic SVG connection above the newsletter. Hit areas remain stationary; there is no scroll interception. Motion uses one scheduled frame loop that stops at rest or when the document is hidden. The footer control and operating-system reduced-motion preference disable every effect. Mobile uses smaller offsets and no pointer magnetism on touch.

The large closing collaboration CTA is now a newsletter form. A compact collaboration strip follows it immediately before the footer. The same newsletter treatment replaces the large pricing CTA. Contact retains its inquiry form.

`/signup/` explains the future account benefits and collects access requests; `/login/` and `/forgot-password/` provide linked entry/recovery designs. Authentication is not connected, so password controls remain disabled and no success/session/reset is simulated. The current public workspace continues to be a preview.

Newsletter and access requests use static Netlify Forms definitions with a honeypot. The script refuses to report success when form detection has not registered a form, when the host returns an error, or on the unconnected local preview. Email and SMS consent are independent. Phone is submitted only with SMS consent; SMS consent makes phone required. Consent notice version is retained. Automatic newsletter and SMS delivery are not connected.

Profile `location` and `phone` are included in the existing browser-local save/load cycle. Location uses browser `address-level2` autofill and remains editable; a geographic suggestion provider is deferred. Profile phone does not enroll a user in SMS. Privacy copy reflects this distinction.
