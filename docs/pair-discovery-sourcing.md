# Pair discovery sourcing model

Production reference for The Pull / Collaboration Observatory.

## Principle

Every social/distribution channel has two independent evidence lanes:

1. **Owned / official** — content published by Brand A, Brand B, a canonical collaboration account, or an authorized representative.
2. **Conversation / earned** — public posts, threads, comments, communities, groups, newsletters, pins, reviews, reactions, and other discussion about the collaboration.

Never merge these lanes into one denominator or one engagement metric.

## Enabled channels

| Channel | Owned / official | Conversation / earned |
|---|---|---|
| Instagram | Brand posts, Reels, Stories when capturable, collaboration tags, canonical post IDs | Public posts, Reels, comments, mentions, hashtags, creator/community discussion |
| YouTube | Official videos, Shorts, descriptions, playlists, launch films | Reviews, reactions, commentary videos, Shorts, comments |
| X | Canonical brand posts, threads, replies, media | Mentions, quote-posts, replies, threads, hashtags |
| TikTok | Official brand videos, captions, sounds, launch posts | UGC, stitches, duets, reviews, mentions, hashtag/sound participation, comments |
| LinkedIn | Company-page posts, official executive/employee launch posts, articles, newsletters | Member posts, comments, agency/vendor/trade discussion |
| Facebook | Official Pages, brand posts, events, public brand-run Groups | Public Pages, public Groups, shares, comments, community discussion |
| Reddit | Official brand accounts, verified AMAs/posts, brand-run communities | Relevant subreddit posts and comments |
| Pinterest | Official Pins, boards, campaign/product Pins | Public Pins/boards referencing the collaboration, visual trend context, saves/repins where available |
| Substack | Brand-owned newsletters/publications and official launch notes | Independent newsletter posts, Notes, comments |
| Mastodon | Canonical brand accounts where they exist; preserve instance identity | Public posts, replies, hashtags across discoverable instances |

Private/permissioned surfaces are not silently treated as zero. Record missingness explicitly.

## Pair query variants

Run these variants across each enabled channel:

- `"Brand A" "Brand B"`
- `"Brand A" x "Brand B"`
- `"Brand A" × "Brand B"`
- `"Brand A" "Brand B" collab OR collaboration OR collection OR campaign OR partnership`
- campaign name
- product name
- official hashtag
- launch phrase

## Search recipes

### Official brand sources

- `site:brand-a.com "Brand B"`
- `site:brand-b.com "Brand A"`
- brand newsroom / press / editorial sections

### Owned social

Use canonical handles/accounts and platform-specific site/provider search for all enabled channels.

### Conversation / earned

Search the same pair variants plus campaign names/hashtags across public user/community content. Keep each platform as its own corpus.

### Press

- `"Brand A" "Brand B" -retailer -resale`
- default launch window: `launch_date - 7d → launch_date + 30d`
- canonicalize URL, publisher, date, and syndication family

## Minimum social/content record

In addition to the Observatory source model, persist:

- `platform`
- `channel_role`: `owned | conversation`
- canonical account / community ID
- canonical content URL / post ID
- author/account/publisher/community
- `content_type`: post, video, comment, thread, pin, newsletter, group_post, etc.
- parent/root thread ID where applicable
- `published_at`
- `captured_at`
- `observed_at`
- `query_id` / `corpus_version`
- market / language
- visibility/access class
- engagement snapshot and denominator when genuinely available
- completeness: complete_for_request / partial / unknown
- review status
- rights/display status

## Platform caveats

- **Facebook Groups:** public groups may be discoverable; private groups require explicit permission and must otherwise be marked unavailable.
- **LinkedIn:** not all member content is publicly indexable. Provider/API permissions determine coverage.
- **Mastodon:** federation means there is no universal global corpus. Preserve `@account@instance` and instance/domain coverage.
- **Reddit:** retain subreddit, post ID, comment ID, and parent/root relationship.
- **Substack:** distinguish full newsletter posts from Notes/comments.
- **Pinterest:** Pins may point to the same underlying source; deduplicate by canonical destination where the metric being counted is destination-level.
- **TikTok / X / Instagram:** post-level metrics are time-sensitive snapshots and must include observed_at.
- **YouTube:** distinguish videos, Shorts, comments, and channel-level metrics.

## Cadence

- Owned launch content: capture at announcement/launch.
- Eligible owned post metrics: snapshot at ~72h and day 7.
- Public conversation: daily during launch week, then weekly through day 30.
- Outcome study: 7 / 30 / 90-day windows.
- Never reconstruct missing historical snapshots from current values.

## Counting rules

- Never combine owned-media engagement with earned conversation engagement.
- Never sum cross-platform mentions into a universal total unless the product explicitly defines and labels the combined corpus.
- Deduplicate syndication/cross-posts only within the relevant counting universe and using a documented rule.
- Missing, blocked, private, deleted, unsupported, or provider-failed data remains null with a missingness reason.
