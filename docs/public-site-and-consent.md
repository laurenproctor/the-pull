# The Pull: public site, support, and consent

## Positioning — confirmed September 24, 2026

The Pull is a one-stop collaboration shop for brands. Its primary offering is handling the actual collaboration: strategy, partner discovery and outreach, concept development, partner alignment, coordination of rights and approvals with relevant advisers, creative and production coordination, launch, and measurement. The Observatory is the research layer; Partner Studio is the developing delivery workspace. Marketing must lead with the service, not position The Pull as only a SaaS subscription or research database. Do not claim existing clients, guaranteed results, a law firm relationship, or operational software capabilities without evidence.

## Routes

- `/`: service-first public marketing site, served from index.html.
- Existing app routes including `/app/discover`, `/observatory`, `/legal`: dashboard.html via the Netlify catch-all. `/legal` remains the prototype contract workspace.
- `/app/support`: Help & support inside the dashboard, with FAQs and an email composer. It does not submit a ticket or send email automatically.
- `/privacy/`, `/terms/`, `/cookies/`, `/accessibility/`, `/editorial-policy/`: standalone static information pages.

## Consent

site-consent.js is loaded from the head of every HTML document. BugHerd is configured in each head as an inert script template and loads asynchronously only after feedback consent. YouTube/Instagram players use data-consent-src and are activated only after media consent, including dynamically rendered study cards. External source images are disclosed separately and are not described as blocked by these settings.

Optional categories start off. Accept and Reject are equally prominent. Preferences persist locally for 180 days; storage errors fall back to the current page with a visible status message. Revoking feedback reloads the page to stop the active third-party script. Revocation does not erase previously sent BugHerd reports or third-party-owned cookies. A footer/sidebar control reopens preferences. Native dialog provides focus containment and Escape dismissal; focus returns to the opener.

## Owner details still required

The owner supplied `@the---pull.com`; support@the---pull.com and privacy@the---pull.com are the configured role addresses. Their deliverability has not been verified. Activate/confirm these mailboxes. Add the registered operator name and business address, confirm service-provider arrangements and retention/transfer practices, and obtain appropriate legal review before commercial launch. Do not claim these preview policies constitute jurisdiction-complete legal compliance. No unsupported company number, jurisdiction, certification, refund promise, or paid terms has been invented. Paid services require a separate written scope and contract.

## Reference guidance

- ICO consent guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/
- ICO privacy information: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/
- W3C accessibility statements: https://www.w3.org/WAI/planning/statements/
- BugHerd: https://bugherd.com/privacy
- Netlify: https://www.netlify.com/privacy/

The accessibility statement targets WCAG 2.2 AA without claiming conformance or an independent audit. Broader assistive-technology testing remains outstanding.
