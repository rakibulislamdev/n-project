"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
  margin?: string;
}

export function ScrollDiv({
  children,
  className,
  delay = 0,
  y = 0,
  scale = 1,
  duration = 0.6,
  margin = "-50px",
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollSection({
  children,
  className,
  delay = 0,
  y = 0,
  scale = 1,
  duration = 0.6,
  margin = "-50px",
  id
}: ScrollAnimationProps & { id?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
}
