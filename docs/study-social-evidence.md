# Social evidence on study pages

The four Observatory studies share `study-evidence.js` and `study-evidence.css`.
`renderStudyEvidence(id, study)` is called from the existing study renderer.

## Coverage

Each study has independent owned and earned sections for Instagram, YouTube, X,
TikTok, LinkedIn, Facebook Pages, Facebook Groups, Reddit, Pinterest, Substack,
and Mastodon. Empty sections state “Posts were not observed.” This describes the
saved source pack, not the whole network. A missing TAFFIN post is excluded from
the counts, and Herrera collection context is labeled explicitly.

Counts are evidence records, not unique people, impressions, or engagement.
Social lanes are deduplicated independently. Editorial links and official web /
email sources are separate sets. The sidebar reports the number of networks
with evidence instead of the previous uncalibrated quality percentage.

## Media

Media records support image/GIF, video file, audio file, YouTube, and Instagram
post/Reel URLs. Remote embeds have original-source links; image/video failures
have a fallback message. Related campaign images are labeled as context rather
than original post media. Arbitrary embed HTML is never accepted.

Three Paul Smith / Barbour Instagram Reel permalinks were recovered from the
existing Impression source on 2026-09-25. Their collection timestamp records this
recovery, not a fresh observation of engagement metrics. The original film uses
its existing YouTube URL. No media is invented for text-only source records.

## Collection timestamps

Existing matched source capture dates retain day precision. Unknown collection
times remain unknown; opening the page never changes a capture timestamp.
Sections annotate the most recent recorded collection and count undated records.
Gallery, metrics, press, and source-list footers explicitly label source-pack
dates where item-specific capture metadata was not saved.

## Retry workflow and persistence

This repository remains a static Netlify site. There is no automated social API
collector. “Try data collection again” opens a dialog that says so, provides a
network-scoped public search, and lets the user manually add a collected post.
Searches alone do not count as collection or update data timestamps.

Manual additions are explicitly browser-local, under the localStorage key
`the-pull:study-evidence:v1`. They are scoped by study, network, and lane. They
persist on reload, can be removed, and are not published to GitHub or shared with
other visitors. Storage failure is reported before claiming success.

On addition/removal, the previous local count snapshot is preserved. Trend
numbers compare those saved record sets; no earlier snapshot means no trend.
The collection-date chart excludes undated records and is labeled as collection
activity, never publication or audience growth.

For shared automated collection, a future service must provide authenticated
provider access, durable canonical post IDs, owned/earned classification, media
provenance, collected-at metadata, failures/partial results, and immutable count
snapshots. Do not replace the manual workflow with simulated jobs or timestamps.
