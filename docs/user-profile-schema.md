# User profile and brand appearance schema

Reference model for The Pull.

## Design principles

- A **user** owns personal identity and preferences.
- A **brand / organization** owns brand identity, approved dashboard styling, and membership policy.
- A **membership** joins a user to an organization and carries role/permissions.
- A **collaboration membership** controls access to a specific collaboration.
- Authentication credentials do **not** live in the profile table.
- Brand website imports produce a **theme proposal** first. A human approves it before it becomes an active organization theme.
- Never ingest or execute arbitrary CSS, JavaScript, analytics tags, or third-party scripts from a brand website.

## 1. users

| Field | Type / rule | Notes |
|---|---|---|
| id | UUID / stable ID | Primary identity |
| email | normalized email, unique | Login, invitation, recovery |
| username | normalized string, unique | Public/workspace handle |
| first_name | string, required | |
| last_name | string, required | |
| display_name | nullable string | Optional override; default first + last |
| avatar_url | nullable URL/object key | Prefer owned object storage |
| job_title | nullable string | |
| phone | nullable E.164 | Optional; useful for operational contacts |
| timezone | IANA timezone | Required for approval deadlines |
| locale | BCP 47 locale | e.g. en-US |
| status | active / invited / suspended / deactivated | |
| last_login_at | timestamp | Security/account context |
| created_at | timestamp | |
| updated_at | timestamp | |

### Do not store

- readable password
- password hint
- raw recovery codes
- OAuth access tokens in the profile row

Authentication should be managed by Clerk/Auth0/Supabase Auth/etc. If self-hosted, password hashes belong in a dedicated authentication credential table with modern password hashing, rate limiting, reset-token handling, and credential rotation.

## 2. auth_account_metadata

Usually supplied by the auth provider rather than owned directly by The Pull.

- user_id
- password_set: boolean
- password_changed_at
- mfa_enabled
- mfa_methods
- recovery_methods_configured
- last_successful_auth_at
- suspicious_login_state
- provider identities
- session count

Never return password hashes to the browser.

## 3. organizations / brands

| Field | Notes |
|---|---|
| id | Stable organization ID |
| canonical_name | Brand/company name |
| slug | URL-safe identifier |
| website_url | Canonical public website |
| logo_asset_id | Approved logo |
| organization_type | brand / studio / agency / venue / other |
| status | active / archived |
| created_at / updated_at | Audit |

A user's website URL should generally resolve to the organization, not be copied independently to every user profile.

## 4. organization_memberships

A user may belong to multiple organizations.

- id
- user_id
- organization_id
- role: owner / admin / brand_manager / member / finance / legal / analytics / viewer
- status: invited / active / suspended
- is_primary
- invited_by_user_id
- joined_at
- permissions_json or normalized permission rows

Do not put one global role directly on users. A person can be an admin in one organization and a viewer in another.

## 5. collaboration_memberships

Controls participation in one collaboration.

- collaboration_id
- organization_id
- user_id
- collaboration_role
- can_view_shared
- can_comment
- can_upload
- can_approve
- can_view_org_private
- can_view_private_analytics
- can_manage_members
- created_at / revoked_at

Studio-private access should be a separate permission and should never be granted merely because someone belongs to one of the brands.

## 6. user_preferences

- user_id
- use_organization_theme: boolean
- appearance_mode: system / light / dark
- approval_notifications: boolean
- deadline_notifications: boolean
- weekly_summary: boolean
- product_newsletter_subscribed: boolean
- product_newsletter_opted_in_at: nullable timestamp
- product_newsletter_opt_in_source: nullable string
- marketing_updates: boolean
- notification_email_override: nullable
- default_workspace_id: nullable
- reduced_motion: boolean
- created_at / updated_at

Consider keeping channel-specific notification preferences in a separate table if email, Slack, SMS, or push are later supported.

## 7. brand_theme_imports

One row per website-analysis attempt.

| Field | Notes |
|---|---|
| id | Import ID |
| organization_id | Brand whose site is being analyzed |
| requested_by_user_id | Audit |
| source_url | Website URL entered by user |
| canonical_url | Redirect-resolved URL |
| source_domain | Domain |
| started_at / completed_at | |
| status | queued / running / ready / failed / review_required |
| extractor_version | Reproducibility |
| source_hash | Detect changes |
| raw_evidence_ref | Private retained source/metadata if permitted |
| error_class | Sanitized failure type |
| created_at | |

## 8. brand_theme_proposals

Extraction output. This is **not active styling yet**.

- id
- import_id
- organization_id
- logo_candidate_url / asset_id
- primary_color
- secondary_color
- accent_color
- surface_color
- text_color
- heading_font_name
- body_font_name
- border_radius_hint
- imagery_style_tags
- source_evidence_json
- contrast_validation_json
- accessibility_status: pass / warning / fail
- rights_status for logo/font assets
- review_status: pending / approved / rejected
- reviewed_by_user_id
- reviewed_at

### Extraction rule

Only extract constrained tokens:
- logo candidate
- colors
- typography names
- broad surface/radius cues
- optional imagery descriptors

Do **not** import:
- arbitrary CSS
- JS
- trackers
- pixel tags
- animations
- third-party widgets
- unlicensed font binaries

## 9. brand_themes

Approved, versioned organization theme.

- id
- organization_id
- version
- source_proposal_id
- logo_asset_id
- primary_color
- secondary_color
- accent_color
- surface_color
- text_color
- heading_font_token
- body_font_token
- radius_scale
- token_json
- is_active
- activated_by_user_id
- activated_at
- superseded_at

Keep versions immutable so changing a brand site does not silently rewrite an existing dashboard appearance.

## 10. sessions / audit events

At minimum record:
- user_id
- event type
- organization_id
- collaboration_id where applicable
- IP/device metadata according to privacy policy
- created_at
- actor / action / object / version for sensitive changes

Important events:
- password changed
- MFA enabled/disabled
- session revoked
- username/email changed
- avatar changed
- membership/permission changed
- theme import requested
- theme activated
- theme reverted

## Profile-page sections

### Personal information
- avatar
- first name
- last name
- username
- email
- job title
- optional phone
- timezone
- locale

### Brand membership
Read-only for ordinary brand managers unless they have organization-admin rights:
- organization
- membership role
- collaboration access
- invitation status

### Brand appearance
- website URL
- analyze/preview
- proposed logo/colors/type
- accessibility/contrast result
- source provenance
- approve/apply if permissioned
- user preference to use organization styling

### Security
- password status
- change password
- MFA
- active sessions/devices
- login activity
- recovery method status

### Notifications/preferences
- approvals
- deadlines
- weekly digest
- product newsletter: product updates, industry updates, and the art and science of brand collaborations
- explicit newsletter consent timestamp/source
- optional marketing/product updates
- theme preference / reduced motion

## Username constraints

- unique, case-insensitive
- normalized form stored separately if needed
- 3–30 characters
- letters, digits, period, underscore, hyphen
- reserved-name blocklist
- change cooldown if usernames become externally addressable
- preserve username-change audit history

## Brand-theme permissions

Recommended:
- brand manager: preview imported theme
- brand admin/owner: approve and activate organization theme
- Studio admin: inspect/debug source evidence; do not silently override brand-approved theme
- collaboration guest: consume active theme only

## Accessibility contract for imported themes

Before activation:
- check text/background contrast
- keep focus states visible
- preserve semantic status colors
- do not let brand color remove error/warning distinction
- use safe font fallbacks
- do not reduce minimum touch targets
- preserve reduced-motion preference
- allow immediate revert to default The Pull theme


## Autosave behavior

Profile editing should use debounced autosave for low-risk profile and preference fields.

Recommended states:
- All changes saved
- Saving…
- Save failed — retry

Recommended debounce: 500–1000 ms after the last edit.

Autosave:
- names
- username after availability validation
- job title
- timezone / locale
- notification preferences
- newsletter preference
- brand website URL
- personal theme preference

Do not autosave:
- current password
- new password
- MFA enrollment secrets
- recovery codes
- destructive account actions

Password/MFA/session actions require explicit submission and reauthentication where appropriate.

The production API should use optimistic concurrency/versioning or updated_at checks so one browser tab does not silently overwrite newer profile changes from another session.
