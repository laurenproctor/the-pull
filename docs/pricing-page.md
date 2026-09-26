# Public pricing

Published offers: Opportunity Sprint $5,000 fixed; Managed Collaboration $16,000 per partner ($32,000 total for two partners); ongoing programme by custom proposal; public Observatory free. Fees are USD; managed collaboration pricing is per partner for the defined two-partner engagement. External budgets and applicable taxes are additional.

The Sprint is included in a managed engagement. The full fee is credited for the same brief within 60 days. The page defines baseline research, revisions, timeline, marketing scope, outreach limits, separate supplier costs, and milestone billing. No checkout or payment processing is added: scope is agreed before paid work.

The proposed $15,000 founding pilot, $12,500 monthly programme, internal phase allocations, future $99/$299 research subscriptions, and success fees remain unpublished. They are not established public offers.

## Legal review

Independent agreement review is described as scope and fee confirmed by counsel. The proposed $1,500 package remains unpublished because the providing lawyer/firm, package and fee have not been confirmed. The Pull is not presented as providing legal advice. Counsel confirms jurisdiction, conflicts, availability, engagement and billing. No legal documents are collected by the public form, and no legal fee-sharing arrangement is introduced.

Reference discussed with user: New York Rules of Professional Conduct (Nov 2025), Rules 5.4 and 7.1; NYSBA Ethics Opinion 942. Provider counsel must approve any future fixed-fee legal advertisement and business arrangement. https://www.nycourts.gov/ad3/agc/rules/22NYCRR-Part-1200.pdf ; https://nysba.org/ethics-opinion-942/

## Enquiry flow

Pricing calls to action link to `/contact/?interest=sprint|managed|programme|legal`. `marketing.js` accepts only known selection keys and prefills the visible enquiry dropdown. Visitors may change the selection. The selected service is included in the reviewable email draft. Nothing is submitted or persisted automatically. Without JavaScript the form options and direct email remain available.

`/pricing/` is in all public headers and footers. The six-link menu collapses at 1050px and below. Existing consent-gated BugHerd, both themes, and dashboard routing remain in place.

Edit the source in `scripts/build-marketing.py`, then regenerate. CSS is in `marketing.css`.
