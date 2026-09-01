"use client";

import { MotionConfig, motion } from "motion/react";

/**
 * Envuelve contenido bajo el fold y lo anima al entrar en viewport.
 * `reducedMotion="user"` respeta prefers-reduced-motion del sistema,
 * igual que las animaciones CSS de globals.css.
 */
export function RevealEnScroll({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
