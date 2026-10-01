# ORYA Co-Founder Guide

## How the team works

| Tool | Purpose | Who uses it |
| --- | --- | --- |
| **GitHub** | Code, branches, issues, pull requests, reviews, and history | Co-founders, developers, owner |
| **Preview host** | Shareable test link for a branch / pull request | Co-founders and reviewers |
| **Manus/WebDev** | Final QA, domains, connected services, and production publishing | Site owner / Manus collaborators |
| **Cal.com** | Discovery-call scheduling after the contact form | Visitors |

GitHub is the source of truth for collaboration. Manus/WebDev remains the controlled production-publishing environment.

## What is in the current site

| Area | Visitor experience | Main code location |
| --- | --- | --- |
| Homepage | ORYA positioning, animated orbital hero, capabilities, featured work, and process | `client/src/pages/Home.tsx` |
| Capabilities | Four service pillars | `client/src/lib/siteData.ts` and `client/src/pages/Capabilities.tsx` |
| Work | Partnership concept story | `client/src/pages/Work.tsx` |
| About | ORYA story plus KY, DC, and Kinshasa signal interaction | `client/src/pages/About.tsx` |
| Contact | Discovery form, email-draft handoff, Cal.com modal | `client/src/pages/Contact.tsx` |
| Navigation / footer | Global desktop and mobile navigation, email, geography | `client/src/components/SiteShell.tsx` |

## Contact and booking flow

1. Visitor submits the contact form.
2. Their browser opens a prepared email draft to `contact@orya.global`.
3. An in-site Cal.com modal opens with their name and email prefilled.
4. They can book, open Cal.com in a new tab, press Escape, or select **Return to ORYA**.

> The form does **not** currently store enquiries in a database or send an automatic server-side notification. A visitor must send the generated email draft themselves.

## How to request a change

Create a GitHub Issue with this information:

```md
## Goal
What visitor or business outcome should improve?

## Requested change
What needs to be added, removed, or rewritten?

## Location
Which page or section is affected?

## Final copy or assets
Paste approved text and attach logos/images/links.

## Definition of done
What must be true for the request to be complete?
```

Suggested labels: `content`, `design`, `bug`, `growth`, `contact-flow`, `mobile`, `needs-review`, `high-priority`.

## Pull-request review checklist

Before approving a pull request, confirm:

- Copy is approved, accurate, and on brand.
- CTAs go to a meaningful destination.
- The change reads well on mobile and desktop.
- The contact / booking path is tested if it was changed.
- No credentials, client data, or secrets were added.
- The preview link matches the requested outcome.

## Publishing authority

| Action | GitHub co-founder with Write access | Manus/WebDev owner |
| --- | ---: | ---: |
| Create branches, issues, and pull requests | Yes | Yes |
| Review PRs | Yes | Yes |
| Merge to `main` | Only if explicitly permitted | Yes |
| Share PR preview links | Yes, after preview hosting is configured | Yes |
| Publish to `orya.global` | No | Yes |
| Change domains, credentials, connected services, or payment settings | No | Yes |

## Team rules

- Keep `main` production-ready.
- Use one branch per focused change.
- Do not put passwords, API keys, or customer data in GitHub.
- Ask the owner before changing the Cal.com event, `contact@orya.global`, global branding, domains, or connected services.
- Use GitHub comments for exact feedback instead of relying only on group-chat messages.
