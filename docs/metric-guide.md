# Metric annotations and benefit-led copy

The marketing page source is `scripts/build-marketing.py`. Run it after copy changes; generated HTML is committed for Netlify. Each opening names the offer, the customer benefit and a next action. Existing photographs and motion remain intact.

## Dashboard guide

`metric-annotations.js` and `metric-annotations.css` are loaded once by `dashboard.html`, including all rewritten dashboard routes and brand portals. No API calls, tracking or provider credentials are added.

The Annotations switch uses the shared theme-switch styling. It persists under `the-pull:annotations:v1`; default is off. When on, metric hosts support mouse hover and explicit question-mark activation. Page metrics lists visible metrics and decision fields. Selecting an entry pins its explanation; Close or Escape dismisses it. Turning annotations off hides the guide and all markers. Keyboard activation and touch use the same buttons.

The catalog distinguishes public snapshots, saved research records, first-party data proposals, illustrative Studio figures and internal workflow states. Every entry supplies a definition, calculation/collection method, source/API proposal, fallback, cost basis, significance, next action and limitation. Estimates are dated 25 September 2026, in USD, with analyst labor explicitly assumed at $50/hour. Shared subscriptions are not additive per metric. Source links are included in the guide.

Provider references reviewed: Context.dev pricing, Firecrawl pricing, Google Analytics Data API quotas, YouTube Data API quotas, Search Console Search Analytics, Instagram Insights, Shopify Admin GraphQL orders and HubSpot contacts. APIs remain proposed; annotations do not connect providers. Public extraction cannot replace private analytics, historical baselines or causal measurement.

## Extending coverage

Add a semantic catalog entry and an explicit DOM selector rule when introducing a new metric. Keep field meaning separate from source pricing so shared assumptions remain consistent. Rules re-scan after dynamic rendering and update accessible labels when values/roles change. Do not substitute a generic metric description for an unexplained numeric score. Hidden tabs and collapsed sections enter the page list when opened. Decorative numbering and calendar day numbers are not metrics.

The Observatory donut is distinct networks with saved evidence / 11; it is not the older placeholder percentage in the static seed. Studio coverage bars remain illustrative percentages without denominators. Stage progress reflects navigation position / six stages, not delivery completion. The trend chart has no observed quantities. These distinctions are intentional.

## Verification for this release

- Syntax checks, generator run, whitespace checks, local asset references and unique marketing imagery.
- Browser coverage across discovery, brief, assessment, comparison, opportunity, pursuit, analytics tabs, legal, creative, campaign, Observatory library/brands/calendar and four studies, profile, support and both portal result variants.
- Six marketing pages at mobile width; dashboard at 390px and 320px with no horizontal page overflow after fixing the trend annotation placement.
- Hover, Enter activation, Escape with focus return, closing, the page list, on/off visibility, navigation persistence and dark mode.
- Campaign Include/Later changes update both budget and explanation ($44K → $26K → $44K); annotations do not alter the calculation.
- Study title responds to its card width so evidence sidebars cannot squeeze KPI columns into unreadable strips.

Future prices and API capabilities must be rechecked before implementing a provider. Final costs depend on volume, access, refresh frequency, data quality and review needs.
