"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
  once?: boolean;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  once = true,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.22 }}
      transition={{ duration: 0.72, delay, ease: smoothEase }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const motionEase = smoothEase;
