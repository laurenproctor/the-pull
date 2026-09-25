# Campaign exploration — 25 September 2026

Reference: the user's Rains footwear screenshot and the Rains US homepage,
reviewed in the browser on 25 September 2026. This borrows the visual system:
compact floating navigation, oversized sans-serif campaign headlines, full-width
media, small capsule actions, and a neutral editorial rhythm. No Rains footage,
logo, product copy, or assets are used.

The visual pass applies to every marketing, account-entry, policy and error page.
The dashboard remains a functional data interface. Existing service details,
pricing, account availability notices, forms and metric annotations remain.
The homepage explains the service in the first screen and benefits immediately
below it. Every marketing photograph has a unique placement.

Three distinct eight-second, silent MP4 studies are original procedural meshes:
`attraction` on Home, `alignment` on Services, and `momentum` on Approach.
They are abstract brand films, not documentation of client work. Sources and
reproduction instructions are in `scripts/render-pull-films.py`. Existing photo
assets are retained. Each video has its own poster, and all three MP4s together
are under 1 MB. Films load only when near the visible area; they pause outside
the viewport or hidden tabs. Reduced motion, the existing global motion setting,
and data-saving preferences prevent automatic playback. Local play/pause
controls allow explicit playback and do not move the hit area.

The prior production revision is `403ec24d1dd418e06177fba8003b8c97dcd0a1f8`.
This exploration is isolated in its own commit and `campaign.css` for reversal.

Verification: mobile layouts of all nine main/account pages at 390px, desktop
Home and Services, menu navigation, video play/pause, no duplicate photo sources,
valid JS, local MP4 loading, and clean whitespace checks. Live checks follow
deployment. Auth and subscription providers remain unconnected as before.
