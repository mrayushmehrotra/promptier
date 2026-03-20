"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import {
  fadeIn,
  slideUp,
  scaleIn,
  hoverLift,
  hoverScale,
  pressScale,
  normalTransition,
} from "@/lib/animations";

type VariantPreset = "fade" | "slideUp" | "scaleIn" | "none";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  variant?: VariantPreset;
  delay?: number;
  hover?: boolean;
  press?: boolean;
}

export function MotionDiv({
  children,
  variant = "fade",
  delay = 0,
  hover = false,
  press = false,
  ...rest
}: MotionDivProps) {
  const variants = {
    fade: fadeIn,
    slideUp: slideUp,
    scaleIn: scaleIn,
    none: {},
  }[variant];

  const hoverVariants = hover ? hoverLift : {};
  const pressVariants = press ? pressScale : {};

  const combinedVariants = {
    ...variants,
    ...hoverVariants,
    ...pressVariants,
  };

  return (
    <motion.div
      initial={combinedVariants.initial}
      animate={combinedVariants.animate}
      exit={combinedVariants.exit}
      transition={{
        ...normalTransition,
        delay,
      }}
      whileHover={hover ? hoverVariants.hover : undefined}
      whileTap={press ? pressVariants.press : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default MotionDiv;
