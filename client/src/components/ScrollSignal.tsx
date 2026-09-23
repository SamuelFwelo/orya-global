import { motion, useMotionTemplate, useReducedMotion, useScroll } from "framer-motion";

export function ScrollSignal() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const verticalTransform = useMotionTemplate`scaleY(${scrollYProgress})`;
  const horizontalTransform = useMotionTemplate`scaleX(${scrollYProgress})`;

  if (reduceMotion) return null;

  return (
    <div className="scroll-signal" aria-hidden="true">
      <span className="scroll-signal__label mono">SCROLL / SIGNAL</span>
      <span className="scroll-signal__track">
        <motion.i
          className="scroll-signal__fill scroll-signal__fill--desktop"
          style={{ transform: verticalTransform }}
        />
        <motion.i
          className="scroll-signal__fill scroll-signal__fill--mobile"
          style={{ transform: horizontalTransform }}
        />
      </span>
    </div>
  );
}
