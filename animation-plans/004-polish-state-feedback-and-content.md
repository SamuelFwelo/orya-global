# 004 — Polish state feedback and content cohesion

- **Status**: DONE
- **Commit**: 3178aaf
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens
- **Estimated scope**: 8 files, medium

## Problem

The capability selector in `client/src/components/OrbitalStage.tsx:38-58` behaves like tabs but lacks tab semantics and uses a 450ms UI content transition. The intro cannot be skipped by keyboard. Route metadata is homepage-only. Several visible copy strings use em dashes, which weakens the desired editorial voice.

## Target

Give the capability selector `tablist`/`tab`/`tabpanel` semantics with arrow-key navigation. Use a 240ms state transition with `cubic-bezier(0.23, 1, 0.32, 1)` and a subtle 8px transform. Allow Escape to dismiss the rare intro. Add per-route titles and descriptions. Replace visible em dashes with natural punctuation while preserving code identifiers that use a dash as a visual data mark.

## Repo conventions to follow

- Shared content lives in `client/src/lib/siteData.ts`.
- Page metadata uses `document.title` on the homepage; extract this into a small reusable hook.
- Keep the restrained Orbital Noir tone and existing information hierarchy.

## Steps

1. Add semantic tab behavior and arrow-key selection to `CapabilityOrbit`.
2. Shorten capability content motion to 240ms and retain reduced-motion opacity feedback.
3. Add Escape handling to the intro.
4. Create and use a route metadata hook on all five routes.
5. Remove visible em dashes from website copy.

## Boundaries

- Do not add new visible sections or fabricated claims.
- Do not change the official logo.
- Do not change homepage title length outside the current validated 57 characters.

## Verification

- **Mechanical**: `pnpm check && pnpm build` must pass.
- **Feel check**: arrow through capabilities and confirm each state changes quickly without double exposure; press Escape during the first-session intro; verify every page title and description.
- **Done when**: state changes are accessible and responsive, metadata is route-specific, and copy punctuation feels human and editorial.
