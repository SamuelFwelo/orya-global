# 002 — Rebuild the mobile menu as an accessible dialog

- **Status**: DONE
- **Commit**: 3178aaf
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 2 files, medium

## Problem

`client/src/components/SiteShell.tsx:55-72` uses a custom `div` overlay controlled only by `aria-hidden`. It does not trap focus, close on Escape, restore focus to its trigger, or hide background content from assistive technology.

```tsx
<button className="menu-trigger" onClick={() => setOpen(!open)} ... />
<div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
```

## Target

Use the existing Radix-based `Sheet` primitive. Keep the signature elliptical reveal, but drive it from `data-state=open|closed`. Use an opening animation around 420ms with `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` and a faster 260ms close. Preserve immediate keyboard behavior through the primitive’s Escape, focus-trap, and focus-restoration semantics.

## Repo conventions to follow

- Accessible primitives live under `client/src/components/ui/`.
- The app already depends on Radix Dialog and includes `sheet.tsx`.
- The header uses a bespoke Orbital Noir visual language; the primitive should be unstyled with site classes, not generic card chrome.

## Steps

1. Replace local overlay markup with `Sheet`, `SheetTrigger`, `SheetContent`, `SheetTitle`, and `SheetDescription`.
2. Keep one semantic trigger and one visible close control.
3. Close the sheet on route selection through `SheetClose` around each navigation link.
4. Replace transition-based clip-path with state-keyed open/close animations and reduced-motion opacity-only fallbacks.

## Boundaries

- Do not modify the desktop navigation.
- Do not add a second menu trigger.
- Do not hand-roll focus management.

## Verification

- **Mechanical**: `pnpm check && pnpm build` must pass.
- **Feel check**: open and close repeatedly, press Escape, tab through all links, and confirm focus returns to the trigger.
- **Done when**: the menu is keyboard complete, focus trapped while open, and visibly consistent with the existing orbital reveal.
