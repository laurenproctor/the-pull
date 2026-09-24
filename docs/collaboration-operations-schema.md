# Collaboration operations schema

Reference model for The Pull workspaces: Analytics & Reporting, Legal & Contracts, Creative, and Campaign Planning.

## Core rule

All four workspaces attach to the same collaboration/opportunity graph.

`collaboration_id` is the shared foreign key. Rights, creative, channels, analytics, approvals, and reports should not become disconnected mini-products.

---

# Analytics & reporting

## metric_definitions
- id
- key
- display_name
- outcome_family: attention / observed_demand / brand_response / commercial
- unit
- denominator_definition
- evidence_classes_allowed
- default_window
- description
- version

## metric_observations
- id
- collaboration_id
- brand_id nullable
- metric_definition_id
- platform / source_system
- value
- numerator nullable
- denominator nullable
- observed_at
- window_start / window_end
- evidence_class: public_observation / first_party / provider_estimate / partner_reported / survey / derived
- source_id
- completeness
- review_status
- created_at

## measurement_plans
- id
- collaboration_id
- objective_id
- baseline_start / baseline_end
- activation_date
- outcome_windows
- attribution_method
- required_sources
- data_owner_user_id
- status
- version

## reports
- id
- collaboration_id
- report_type: opportunity_brief / live_campaign / outcome_7d / outcome_30d / outcome_90d / executive / editorial
- audience_scope
- status: draft / review / published / superseded
- source_study_version
- generated_by
- reviewed_by
- published_at
- immutable_version

## report_sections
- report_id
- section_type
- order
- content_json
- evidence_ids
- visibility

Never calculate engagement rate without a denominator. Never calculate launch growth without a prelaunch observation.

---

# Legal & contracts

## agreements
- id
- collaboration_id
- agreement_type: collaboration / production / venue / talent / licensing / data / media / nda / other
- title
- status: not_started / drafting / redline / ready_to_sign / partially_signed / executed / terminated / expired
- owner_user_id
- effective_date
- expiration_date
- governing_law
- document_asset_id
- current_version_id
- created_at / updated_at

## agreement_versions
- id
- agreement_id
- version_number
- file_asset_id
- source: uploaded / generated / redline
- created_by
- created_at
- notes
- content_hash

Versions should be immutable.

## agreement_parties
- agreement_id
- organization_id
- legal_entity_name
- party_role
- signatory_name
- signatory_title
- signature_status
- signed_at

## clauses
Structured clauses that materially change operations:
- id
- agreement_id
- clause_type
- status: proposed / open / agreed / rejected
- structured_terms_json
- human_summary
- source_location
- owner_user_id
- last_reviewed_at

Useful clause types:
- exclusivity
- usage_rights
- trademark/license
- creative_approval
- publicity
- payment
- production_costs
- cancellation
- refunds
- termination
- cure_period
- force_majeure
- indemnification
- insurance
- confidentiality
- data/privacy
- measurement/reporting
- talent/music
- warranties
- renewal

## rights_grants
- id
- collaboration_id
- agreement_id
- asset_type
- grantor_org_id
- grantee_org_id
- channels
- geography
- start_at / end_at
- paid_media_allowed
- modification_allowed
- sublicensing_allowed
- archival_allowed
- approval_required
- status

## legal_obligations
- id
- agreement_id
- organization_id
- obligation
- due_at
- evidence_required
- status
- completed_at

## signature_requests
- id
- agreement_id
- party_id
- provider
- external_request_id
- sent_at
- viewed_at
- signed_at
- declined_at
- status

---

# Creative

## creative_items
- id
- collaboration_id
- title
- creative_type: product / landing_page / ad / organic_social / email / photo / video / press_kit / signage / packaging / event / other
- owner_user_id
- primary_brand_id
- status: planned / briefing / production / internal_review / brand_review / legal_review / approved / locked / published / retired
- due_at
- launch_at
- rights_status
- created_at / updated_at

## creative_versions
- id
- creative_item_id
- version_number
- created_by
- created_at
- asset_ids
- copy_json
- destination_specs_json
- content_hash
- notes
- is_locked

Approved/locked versions should be immutable.

## creative_destinations
- creative_item_id
- campaign_channel_id
- placement
- aspect_ratio
- dimensions
- duration
- CTA
- landing_url
- UTM_template
- publish_window

## creative_reviews
- id
- creative_version_id
- reviewer_user_id
- reviewer_org_id
- review_type: studio / brand / legal / platform
- decision: pending / approved / approved_with_changes / changes_requested
- comment
- decided_at

## creative_comments
Threaded comments anchored to version:
- id
- creative_version_id
- author_user_id
- body
- anchor_json
- parent_comment_id
- created_at / resolved_at

## assets
Reusable source files:
- id
- organization_id
- filename
- mime_type
- storage_key
- rights_owner
- credit
- usage_expiration
- source_url
- checksum
- created_at

---

# Campaign planning

## campaigns
- id
- collaboration_id
- name
- objective
- status: planning / approved / scheduled / live / complete / paused
- start_at / end_at
- market
- working_budget
- approved_budget
- currency
- owner_user_id
- measurement_plan_id

## campaign_channels
One row per possible channel.

- id
- campaign_id
- channel_key
- category: owned / paid / earned / community / experiential / partner_surface
- decision: include / tbd / exclude
- decision_reason
- owner_user_id
- partner_org_id nullable
- start_at / end_at
- working_budget
- approved_budget
- currency
- objective
- audience_definition
- deliverables_summary
- primary_metric
- conversion_event
- measurement_status
- notes
- updated_at

**Critical:** `tbd` is not the same as `exclude`.

## Suggested channel keys

### Owned
- landing_page
- email_crm
- instagram
- tiktok
- linkedin
- youtube
- x
- facebook
- pinterest
- substack
- brand_blog

### Paid
- meta_ads
- tiktok_ads
- google_search
- youtube_ads
- ctv
- display
- native
- sponsored_editorial
- creator_paid
- conversational_ads
- retail_media

### Earned / community
- editorial_outreach
- design_site_syndication
- reddit
- substack_outreach
- creator_seeding
- podcast_outreach
- newsletters
- community_groups

### Experiential / partner
- venue_activation
- launch_event
- retail_display
- packaging
- in_room
- table_service
- sampling
- pop_up
- partner_email
- partner_social

## campaign_deliverables
- id
- campaign_channel_id
- creative_item_id nullable
- description
- quantity
- due_at
- publish_at
- status
- evidence_method

## campaign_budget_lines
- id
- campaign_id
- campaign_channel_id nullable
- vendor_id nullable
- category
- estimate
- approved
- committed
- actual
- currency
- invoice_asset_id

## campaign_tracking
- campaign_channel_id
- utm_source
- utm_medium
- utm_campaign
- utm_content_pattern
- platform_campaign_id
- platform_adset_id
- platform_ad_id
- landing_url
- conversion_event

---

# Cross-workspace dependencies

## Legal → Creative
A creative item should not become launchable if required rights or legal approvals are unresolved.

## Creative → Campaign
Included channels should show required creative deliverables and whether final versions exist.

## Campaign → Analytics
Every included measurable channel should have:
- primary metric
- tracking method
- baseline where relevant
- source system
- owner
- collection cadence

## Analytics → Reporting
Reports consume reviewed observations; they do not calculate facts ad hoc from UI text.

## Campaign → Legal
Channel inclusion may create new legal requirements:
- CTV/video → talent/music rights
- creator content → creator agreement + usage
- paid social → advertising claims/disclosures
- email → consent/compliance
- event/venue → insurance + venue terms
- UGC amplification → permission
- cross-border activation → geography-specific rights/privacy

---

# Permissions

Studio admin:
- full operating access

Brand admin:
- organization-private terms, approved budget, own analytics, approvals

Brand manager:
- shared terms, assigned approvals, shared creative, approved campaign scope

Legal:
- agreements, clauses, rights, signatures, legal review

Creative:
- creative items, versions, asset library, comments

Media/analytics:
- channel plan, budgets where permitted, tracking, observations

Partner users should never gain Studio-private negotiation strategy or another brand's private analytics merely by being members of the collaboration.
