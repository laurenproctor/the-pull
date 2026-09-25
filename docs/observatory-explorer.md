# Observatory: linked brands, calendar, and study interpretation

## Record relationships

Brands have stable IDs, names, verticals and categories. Each collaboration has one
study ID and an array of participating brand IDs. Brand histories query that
relationship, so one collaboration appears under each partner without duplicated
studies. The explorer uses a searchable collaboration list, a brand directory and
a calendar over the same filtered records. Collaboration results paginate at 12.
Shared query parameters preserve view, search, brand, vertical, month and event type.

The static registry currently contains eight brands and four collaboration studies.
For database expansion, store brands, collaborations, collaboration_brands and
collaboration_events separately, preserving these IDs and query semantics. A brand's
total collaboration count and partner count are computed from relationships.

## Calendar

Exact event dates and month-only dates have different fields. Launches / activations
are the default. Announcements, regional releases and all milestones are separate
choices. Global and regional releases are not collapsed into one event. A month-only
release appears below the daily calendar; no day is invented. Monthly counts count
each collaboration once for the selected event type.

All filters apply to the list and calendar. Year/month navigation and monthly bars
allow visual comparison, but the current four September studies cannot establish
market seasonality. The calendar labels that limit. Dates come from the existing
study source pack; primary events are September 4, 10, 14 and 15, 2026.

## Post metrics and comments

Known existing metrics retain their capture dates and evidence quality. Supreme's
three provisional mirror snapshots have approximately 46,300 likes and 191 comments
combined; Herrera's collection-wide result is explicitly not TAFFIN-specific.
Paul Smith's official film preserves the existing 1,351,574-view snapshot.
Unavailable metrics are displayed as unknown, not zero.

No top comment, daily volume or sentiment is inferred from a total comment count.
A manually collected comment includes author, text, source URL, publication date,
collection time, optional visible likes, author affiliation and optional reviewed
sentiment. It is stored under the parent post's stable source identity in the
existing browser-local state. It is not published to other visitors.

Top third-party comment means most liked among saved third-party comments with
known like counts. No like counts means no ranking. Comment graphs use publication
dates (UTC), count saved comments, and label unobserved gaps. Sentiment excludes
brand-authored comments, deduplicates the recorded sample, and excludes unclassified
comments from percentage denominators. Classified sample size remains visible.

## Editorial assessment

Each study has a written performance review: supported signals, overall
interpretation, missing evidence, and the next measurement step. It does not claim
causal ROI, customer growth or sentiment unsupported by source records.

## Current boundaries

The application remains static. Automated comment/social collection and shared
persistence are not connected. Existing collection workflows provide source search
and browser-local capture, with explicit disclosures. Multi-user collectors should
persist canonical post/comment IDs, pagination completeness, metric snapshots,
sampling windows, analysis versions and access status before displaying population
claims or growth trends.
