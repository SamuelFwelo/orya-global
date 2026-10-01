# ORYA Codebase Map

## Architecture

ORYA is a client-rendered React marketing site. Most visitor behavior lives in `client/src`. The production server is intentionally small: it serves the built static app and returns `index.html` for client-side routes.

```text
client/
  index.html                    Fonts and fallback document metadata
  src/
    App.tsx                     Routes, site shell, dark theme, notifications
    index.css                   Orbital Noir tokens, layout, motion, responsive rules
    pages/                      One component per public route
    components/                 Shared UI and interactive experiences
    hooks/                      Metadata and behavior utilities
    lib/                        Shared copy and Cal.com URL construction
server/
  index.ts                      Static production server and SPA fallback
shared/
  const.ts                      Shared constants
```

## Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `pages/Home.tsx` | Primary ORYA story and interactive hero |
| `/capabilities` | `pages/Capabilities.tsx` | Service-pillar detail |
| `/work` | `pages/Work.tsx` | Partnership concept narrative |
| `/about` | `pages/About.tsx` | ORYA story and Global Signal stage |
| `/contact` | `pages/Contact.tsx` | Discovery form and booking handoff |
| fallback | `pages/NotFound.tsx` | Invalid-route experience |

## Where to make changes

| Change | File to start with | Notes |
| --- | --- | --- |
| Navigation, footer email, footer geography, mobile menu | `components/SiteShell.tsx` | Shared across every route |
| Homepage headline, hero CTA, sections | `pages/Home.tsx` | Includes pointer and scroll motion |
| Service names and capability text | `lib/siteData.ts` | Structured content reused across pages |
| Global styles and responsive rules | `index.css` | Check desktop and mobile before merging |
| Contact copy / recipient | `pages/Contact.tsx` | Affects the core conversion path |
| Cal.com event link / prefilling | `lib/calBooking.ts` | Confirm with owner before changing |
| Cal.com modal / exit behavior | `components/CalBookingModal.tsx` | Contains **Return to ORYA** control |
| Geographic node interaction | `components/GlobalSignalStage.tsx` | KY, DC, and Kinshasa nodes |
| Page titles / descriptions / canonicals | `hooks/usePageMeta.ts` | Called once per page |

## Contact flow

```text
Required form fields completed
        ↓
Contact.tsx creates a mailto draft to contact@orya.global
        ↓
CalBookingModal opens after 450 ms
        ↓
calBooking.ts adds name, email, and UTM values to the Cal.com event URL
        ↓
Visitor books, opens a new tab, returns to ORYA, or presses Escape
```

### Current constraints

- There is no inquiry database.
- There is no automatic server-side email notification.
- The user must send the generated email draft.
- Do not change the booking event URL without the owner’s confirmation.

## Design system

ORYA uses an **Orbital Noir** direction:

| Token | Value | Role |
| --- | --- | --- |
| Void | `#08090b` | Main background |
| Carbon | `#17191d` | Surfaces / panels |
| Graphite | `#42464d` | Secondary dark detail |
| Lunar | `#d8d5ce` | Soft neutral |
| Signal white | `#f5f3ee` | Primary text / highlights |
| Cool signal | `#9eadc2` | Accent / focus / data cue |

Typography is configured in `client/index.html` and applied in `client/src/index.css`:

- **Space Grotesk** — display headlines
- **Inter** — body copy
- **IBM Plex Mono** — labels and system language
- **Instrument Serif** — editorial emphasis

### Motion requirements

- Prefer `transform` and `opacity` only.
- Keep motion purposeful, responsive, and keyboard-safe.
- Maintain `prefers-reduced-motion` fallbacks.
- Preserve visible focus states and mobile touch targets.
- Do not add em dashes to visitor-facing copy.

## Assets

Large media is hosted in Manus storage and referenced like this:

```ts
const heroImage = "/manus-storage/orya-kinshasa-horizon_246caae4.jpg";
```

Do not add large media files directly to `client/public` or `client/src/assets`. Use the approved storage workflow, then reference the resulting `/manus-storage/...` path.

## Local development and checks

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm exec vitest run
```

Before changing a shared component, inspect all routes it affects, test desktop/mobile behavior, check keyboard and focus flow, and update a focused test if behavior changes.
