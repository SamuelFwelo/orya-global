# 001 — Move hero motion off the React render path

- **Status**: DONE
- **Commit**: 3178aaf
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files, medium

## Problem

`client/src/pages/Home.tsx:49-69` stores pointer coordinates in React state and updates them on every pointer movement. It also animates with Framer Motion `x`, `y`, and `scale` shorthands. The motion audit standard identifies both patterns as dropped-frame risks on busy pages.

```tsx
const [cursor, setCursor] = useState({ x: 0, y: 0 });
setCursor({ x: ..., y: ... });
<motion.div animate={{ x: cursor.x * -12, y: cursor.y * -8, scale: 1.035 }} />
```

## Target

Use `useMotionValue` for pointer input and `useSpring` for interpolation. Compose the GPU transform as a full string with `useMotionTemplate`. Gate the pointer handler with `(hover: hover) and (pointer: fine)` and `useReducedMotion()`. Use `{ type: "spring", duration: 0.5, bounce: 0.2 }` behavior for decorative pointer motion.

Replace reveal `y` shorthands with full transform strings and keep the existing explanatory marketing durations.

## Repo conventions to follow

- Motion lives in `client/src/pages/Home.tsx` and `client/src/components/OrbitalStage.tsx`.
- Reduced motion already branches through `useReducedMotion()`.
- Use the shared easing token value `cubic-bezier(0.23, 1, 0.32, 1)` for UI entry and the existing editorial marketing curve only for slow explanatory sequences.

## Steps

1. Replace cursor React state with motion values and spring-derived transforms in `Home.tsx`.
2. Gate pointer parallax by input capability and reset to neutral on pointer leave.
3. Replace Framer `x`, `y`, and `scale` shorthands with full `transform` strings in hero, reveal, intro, and capability state transitions.
4. Move predetermined orbital loops to CSS where practical.

## Boundaries

- Do not change homepage information architecture.
- Do not add dependencies.
- Do not animate layout properties.

## Verification

- **Mechanical**: `pnpm check && pnpm build` must pass.
- **Feel check**: move the pointer quickly across the hero while scrolling; movement must remain smooth and settle without jumps. Toggle reduced motion and confirm pointer movement disappears.
- **Done when**: pointer movement does not trigger React component renders and all active transforms are full transform strings.
