# 003 — Fix mobile platform details

- **Status**: DONE
- **Commit**: 3178aaf
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 2 files, medium

## Problem

`client/index.html` disables zoom with `maximum-scale=1`. `client/src/index.css` applies multiple ungated hover effects, lacks tap-highlight and safe-area handling, and globally reduces every animation to near-zero rather than preserving useful opacity feedback.

## Target

Use `viewport-fit=cover` without disabling zoom. Add `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`, safe-area padding, and 16px form controls on coarse pointers. Gate all hover-only styles inside `@media (hover: hover) and (pointer: fine)`. Replace the universal reduced-motion duration override with component-specific rules that remove spatial motion while keeping opacity and color feedback.

## Repo conventions to follow

- Mobile breakpoints are at 1050px and 760px in `client/src/index.css`.
- Hero sections correctly use `100svh`; preserve that stable mobile viewport choice.
- Press feedback target: `transform: scale(0.97)` with `transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1)`.

## Steps

1. Correct the viewport meta tag.
2. Add touch, safe-area, and focus-visible platform rules.
3. Move every site hover rule into an input-capability media query while retaining active/current states outside it.
4. Replace blanket reduced-motion suppression with explicit reduced-motion styles and JS branches.
5. Ensure all form controls remain at least 16px on coarse pointers.

## Boundaries

- Do not disable zoom.
- Do not use user-agent detection.
- Do not disable vertical scrolling or pull-to-refresh globally on this marketing site.

## Verification

- **Mechanical**: `pnpm check && pnpm build` must pass.
- **Feel check**: verify sticky hover is absent on touch, inputs do not trigger iOS zoom, the menu clears the notch, and keyboard focus is visible.
- **Done when**: the viewport is accessible and hover, touch, safe-area, and reduced-motion behavior are capability-driven.
