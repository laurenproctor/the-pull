# Public marketing website

Routes: `/`, `/services/`, `/approach/`, `/contact/`. Existing policy and 404 pages share the public navigation and footer. The dashboard remains at its existing routes; `/legal` is its contract workspace, not public terms.

The service is end-to-end brand collaboration management. The Observatory and Partner Studio support that service. No research subjects are presented as clients, and no fabricated performance or testimonials are used.

`marketing.css` owns the public monochrome visual system, responsive navigation, and both themes. `marketing.js` owns the mobile disclosure menu and local enquiry draft builder. `site-shell.js` inserts the persisted theme switch into `[data-theme-host]`; dashboard fallback behavior is unchanged. BugHerd remains gated by the existing feedback consent.

Run `python scripts/build-marketing.py` to rebuild the four marketing pages and update the shared navigation/footer on existing policy and 404 pages. Edit the source templates there for subsequent marketing copy changes. Existing policy body content is preserved by this script.

## Contact behavior

The form prepares a draft locally. The visitor reviews it, opens their email application with a mailto link, and sends it themselves. A copy fallback supports webmail. No server submission, inbox integration, analytics event, or local persistence of form details exists. Editing the form invalidates the prior draft. Recipient: `support@the---pull.com`, based on the supplied domain; mailbox delivery is not verified. Do not claim an enquiry has been sent.

## Image

`assets/the-pull-together.webp` is an original illustrative image generated with the built-in image-generation tool, exported as WebP for the website. It does not document a client campaign.

Generation prompt: “Use case: photorealistic-natural. Asset: full-bleed wide website hero for The Pull, a premium brand collaboration agency. Original editorial photography: two creative collaborators seen from behind, one in sculptural black outerwear and one in ivory tailoring, walking together through a monumental raw concrete passage toward bright daylight. Their different silhouettes meet in the center-right of the composition. Candid, understated, tactile concrete, grainy analog fashion campaign, quiet architectural drama, cool grey monochrome with natural skin tones. Very wide landscape composition 3:2, generous darker architectural negative space on left and lower left for white website headline added separately. No text, no logos, no watermarks, no UI. This is an illustrative brand image, not a real client campaign.”

Visual reference: rains.com — full-bleed editorial imagery, floating pill navigation, compact sans serif typography, restrained color and generous space. No Rains photography, logo, or marketing copy is reused.
