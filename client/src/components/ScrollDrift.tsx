import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type ScrollDriftProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
};

export function ScrollDrift({ children, className = "", distance = 22 }: ScrollDriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 0.52, 1], [distance, 0, -distance * 0.35]);
  const y = useSpring(rawY, { stiffness: 110, damping: 26, mass: 0.35 });
  const transform = useMotionTemplate`translate3d(0, ${y}px, 0)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transform: reduceMotion ? "translate3d(0, 0, 0)" : transform }}
    >
      {children}
    </motion.div>
  );
}
