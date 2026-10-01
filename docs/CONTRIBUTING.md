# Contributing to ORYA

## Workflow

```text
Issue → feature branch → pull request → preview link → co-founder review → merge to main → Manus QA → production publishing
```

GitHub is for collaboration. Manus/WebDev controls the production site and its domains.

## Branch naming

Use one focused branch per change:

```text
feature/french-language
feature/whatsapp-contact
content/about-copy-refresh
fix/calendar-exit-control
chore/update-dependencies
```

Avoid vague names such as `updates`, `test`, or `sam-changes`.

## Start a change

```bash
git checkout main
git pull user_github main
git checkout -b feature/short-description
```

The remote named `user_github` is the private GitHub repository. Do not change the default `origin` remote; it is managed by the WebDev deployment environment.

## Local development

```bash
pnpm install
pnpm dev
```

Before opening a PR:

```bash
pnpm check
pnpm build
pnpm exec vitest run
```

If behavior changes, add or update a focused Vitest test.

## Pull request requirements

Every PR should include:

- A short business-focused title
- What changed and why
- Routes affected
- A visual preview link or screenshots when visual UI changes
- Test commands run
- Any decision or dependency still needed

## Review checklist

### Content

- [ ] Copy is approved and factually correct.
- [ ] No em dashes were added to visitor-facing copy.
- [ ] Contact details, claims, and booking links are correct.

### Experience

- [ ] CTAs have meaningful destinations.
- [ ] There is no horizontal scrolling on mobile.
- [ ] Keyboard focus, Escape, and interactive dialogs work when modified.
- [ ] Reduced-motion behavior remains intact.

### Technical quality

- [ ] `pnpm check` passes.
- [ ] `pnpm build` passes.
- [ ] Relevant tests pass.
- [ ] No credentials, API keys, or private client data appear in the diff.

## Preview links before merge

A pull request does not create a public preview link until a preview provider is connected. **Vercel** is the recommended option for this Vite/React repository.

Once Vercel is connected to this GitHub repo, each pull request will receive its own preview URL. The contributor can share that URL with the team before anything merges to `main`.

The preview URL is safe for design, copy, and interaction review. It does **not** publish to `orya.global` and it does not change Manus production.

## Recommended GitHub permissions

| Role | Recommended use |
| --- | --- |
| **Admin** | Repository ownership, collaborators, branch protection |
| **Maintain** | Trusted release steward |
| **Write** | Co-founder or developer creating branches and PRs |
| **Triage** | Feedback and issue management without code changes |

For a co-founder who should edit code and open PRs but not control the repo, assign **Write**.

## Recommended protection for `main`

After collaborators are invited, set GitHub branch protection to:

- Require a pull request before merging
- Require at least one approval
- Require all review conversations to be resolved
- Block force pushes
- Add required build checks when CI is configured

## Ownership boundaries

Ask the owner before changing:

- the Cal.com event URL
- `contact@orya.global`
- domains, analytics, connected services, or payment settings
- global ORYA brand assets and typography

Never commit passwords, API keys, database exports, private customer data, or service-account files.
