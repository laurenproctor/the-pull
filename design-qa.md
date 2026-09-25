# The Pull — selected design implementation QA

**Final result: passed**

Source visual truth: the user-selected screenshot `/workspace/scratch/65952510bd35/upload/Screenshot 2026-09-24 at 11.09.54 PM.jpg` (792 × 860), option 1 `/workspace/scratch/65952510bd35/generated_images/exec-def81f5d-8d85-4e2a-b519-fbac82eabb9f.png`, and combined direction `/workspace/scratch/65952510bd35/generated_images/exec-5b126cb1-9270-43db-a52b-72650e8fd4ed.png`.

Implementation: local browser at `http://terminal.local:4173/`. Desktop viewport 1363 × 936 CSS px; browser screenshot content 1348 px wide (scrollbar excluded), density 1. Home full-page capture `/workspace/scratch/pull-home-final.png` (1348 × 4923). Normalized to 792 px wide with the first 860 px compared beside the supplied crop in `/workspace/scratch/pull-home-qa-final.png`. Light theme, navigation closed, motion enabled, optional cookies rejected. The exact attached two-line headline takes precedence over the combined mock's single-line heading.

Full-view evidence: `/workspace/scratch/pull-home-overview-final.png`; desktop inner-page evidence `/workspace/scratch/pull-inner-qa.png`. The latter compares Services, Approach, About, and Contact for consistent typography and composition. Pricing was inspected directly in the browser. Focused evidence: `/workspace/scratch/pull-home-qa-final.png` places the source and revised opening side by side at equal width. Headline, CTA, portrait crop, and caption are legible at this scale. The full browser capture preserves fine UI detail.

## Findings and comparison history

- [Resolved P2, image/layout] First comparison `/workspace/scratch/pull-home-qa.png`: the opening gap was too tall, portraits too short, and caption wrapped into two lines. Reduced intro spacing, increased portrait height/crop, and restored the three-line caption. The revised side-by-side capture shows the selected hierarchy, staggered portraits, and caption restored.
- [Resolved P1, asset] The first below-fold capture exposed a zero-byte ribbon image. Re-encoded and wrote the complete WebP; browser confirmed 1536 natural pixels and the final full-page image shows it loaded.
- [Resolved P2, responsive] At 390 px the header wrapped Menu onto a second line. Workspace now moves into the menu below 600 px. Verified open, close, Escape dismissal, and retained Workspace access.
- [Resolved P2, responsive motion] At 320 px, a 22 px positive reveal offset caused 3 px of horizontal overflow. Changed to a 16 px inward offset. Rechecked browser DOM: viewport and document widths both 305 px after scrollbar; no horizontal overflow.
- [Resolved P2, visual tokens] Existing green/lime consent styling interrupted the selected palette. Scoped neutral styling to the public marketing pages while preserving consent controls.
- No remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces

- **Typography:** Existing Arial/Helvetica sans and Georgia italic reproduce the sans/serif contrast, large display hierarchy, tight tracking, and plain small UI. System fonts introduce small platform differences; accepted. No font requests or layout-shifting font loads added.
- **Spacing/layout:** Oversized two-line opening, asymmetric paired portraits, ruled CTA, full-width ribbon scene, and numbered service rows match the combined direction. Inner pages share the same editorial hierarchy. Mobile intentionally stacks explanatory copy and moves ribbon copy above photography for legibility.
- **Colors/tokens:** Warm ivory, near-black, concrete gray; neutral rules; no new gradients, floating badges, decorative blobs, or generic rounded content cards. Rounded navigation is retained from the selected reference. Dark theme verified visually.
- **Imagery:** Three separately generated editorial photographs, compressed to WebP (about 403 KB total), with explicit dimensions and descriptive alt text. Supplied original together image remains on Approach/About. No invented founder portrait or claimed client campaign. All key images load in browser.
- **Copy/content:** Selected headline, portrait caption, ribbon narrative, and service rows implemented as editable HTML. Existing service scope, pricing, disclosures, founder biography, American spelling, contact options, and previous BugHerd fixes retained.

## Interactions and accessibility

- Six marketing routes inspected in desktop browser; 390 px layouts inspected for Services, Approach, About, Pricing, and Contact. Home checked at 320, 390, 768, and 1363 px. No observed horizontal overflow after the fix.
- Pricing's Opportunity Sprint link opens Contact with Sprint selected.
- Contact form with synthetic test data creates a reviewable unsent email draft; changing a field hides the stale draft. No email was sent.
- FAQ opens; keyboard Escape closes the mobile menu and restores the trigger.
- Theme switch works and dark opening was visually inspected.
- Pause motion changes `data-motion` to off and persists across reload; Enable motion restores it.
- Portrait scroll progress observed moving from 0.351 to 1.000. CTA arrow uses bounded pointer movement with a stationary link hit area. No scroll hijacking, cursor replacement, or continuously running animation loop.
- Reduced-motion handling verified in CSS and JavaScript; no browser emulation API was available for an OS-level preference test. This is a residual test gap, not a claim of emulated verification.
- Focus outlines, semantic headings, native details controls, labels, and visible fallback content retained. Motion is enhancement only; content is not opacity-hidden.
- Browser console checked: no application-origin errors. Browser extension metadata warnings were unrelated to the site.

## Implementation checklist

- [x] Implement selected combination across six marketing pages.
- [x] Preserve prior content and BugHerd fixes.
- [x] Verify generated assets, syntax, generator output, and whitespace checks.
- [x] Complete browser interaction and responsive checks.
- [x] Preserve production baseline at `archive/before-pull-motion-20260925` (`bd4f004fac64b6a17c19b2152b56fb0d76b67311`).

## Follow-up polish

Generated photographic details differ from the mock while retaining its subject, styling, direction, and composition. The exploration can be reverted as one release commit. No further polish blocks this release.

final result: passed
