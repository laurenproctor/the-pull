# The Pull URL schema

The static Netlify prototype now uses clean History API routes with an SPA rewrite to `index.html`.

## Studio workspace

| Route | Purpose |
|---|---|
| `/app/discover` | Market / partner discovery |
| `/app/opportunities/brut-faux/brief` | Collaboration brief |
| `/app/opportunities/brut-faux/assessment` | Opportunity assessment |
| `/app/opportunities/brut-faux/compare` | Partner comparison |
| `/app/opportunities/brut-faux/opportunity-brief` | Opportunity brief / proposition |
| `/app/opportunities/brut-faux/pursuit` | Pursuit tracker |
| `/reports` | Reusable reports |

Production should replace `brut-faux` with the immutable opportunity slug or ID-backed slug.

## Studio operating workspaces

| Route | Purpose |
|---|---|
| `/analytics` | Analytics & reporting overview |
| `/analytics/channels` | Channel performance |
| `/analytics/data-quality` | Attribution + data quality |
| `/analytics/reports` | Report library / generation |
| `/legal` | Legal & contracts |
| `/creative` | Creative production |
| `/campaign` | Campaign planning |

`/reports` remains a compatibility alias for `/analytics/reports` in the prototype.

## Observatory

| Route | Purpose |
|---|---|
| `/observatory` | Collaboration library |
| `/observatory/studies/:studySlug` | Individual collaboration study |
| `/observatory/editorial` | Editorial + newsletter workspace |
| `/observatory/methodology` | Methodology + sourcing |

Current study slugs:
- `budweiser-dickies`
- `supreme-apresse`
- `carolina-taffin`
- `paul-barbour`

## Brand portal

`/portal/:brandSlug/:section`

Sections:
- `home`
- `collaboration`
- `approvals`
- `timeline`
- `files`
- `results`

Prototype examples:
- `/portal/brut/home`
- `/portal/brut/approvals`
- `/portal/faux/results`

Production should authorize every route server-side. A URL is an address, not a permission boundary.

## Account

- `/profile`

Longer-term account routes can grow into:
- `/account/profile`
- `/account/security`
- `/account/notifications`
- `/organizations/:orgSlug/appearance`
- `/organizations/:orgSlug/members`

For the prototype, these remain combined on `/profile`.

## Production routing principles

1. Use human-readable slugs backed by immutable database IDs.
2. Never use organization/brand slugs alone to authorize access.
3. Preserve deep links after login.
4. Return a true 404 for nonexistent public resources and an authorization-safe response for private resources.
5. Route state should represent meaningful application location; filters/sorts can use query parameters.
6. Recommended query examples:
   - `?window=30d`
   - `?scope=partnership`
   - `?evidence=public`
   - `?market=us`
7. Avoid putting sensitive values, emails, tokens, private notes, or internal IDs that expose business information into URLs.
