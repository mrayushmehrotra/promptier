"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={{ duration: 0.4, ease: [0.33, 0, 0.29, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
