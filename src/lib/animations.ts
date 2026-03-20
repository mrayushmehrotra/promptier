import { Variants, Transition } from "framer-motion";

// ============================================================================
// EASING CONSTANTS
// ============================================================================

export const easeOut = [0.33, 0, 0.29, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
export const easeIn = [0.55, 0, 1, 0.45] as const;
export const easeOutBack = [0.34, 1.56, 0.64, 1] as const;

// ============================================================================
// TRANSITION CONFIGS
// ============================================================================

export const fastTransition: Transition = {
  duration: 0.15,
  ease: easeOut,
};

export const normalTransition: Transition = {
  duration: 0.3,
  ease: easeOut,
};

export const slowTransition: Transition = {
  duration: 0.5,
  ease: easeInOut,
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 1,
};

export const gentleSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

// ============================================================================
// CORE VARIANTS
// ============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideUp: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const slideDown: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

export const slideLeft: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
};

export const slideRight: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

export const scaleInBounce: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", ...springConfig } },
  exit: { scale: 0.8, opacity: 0 },
};

// ============================================================================
// MICRO-INTERACTIONS
// ============================================================================

export const hoverLift: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.2, ease: easeOut } },
};

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: easeOut } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const hoverGlow: Variants = {
  rest: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: { boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transition: { duration: 0.3 } },
};

export const pressScale: Variants = {
  rest: { scale: 1 },
  press: { scale: 0.95, transition: { duration: 0.1 } },
};

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerGrid: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.3, ease: easeIn } },
};

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ============================================================================
// LOADING & SKELETON
// ============================================================================

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const pulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

export const toastSlide: Variants = {
  initial: { y: 100, opacity: 0, scale: 0.9 },
  animate: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
  exit: { y: 100, opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// ============================================================================
// IMAGE REVEAL
// ============================================================================

export const imageReveal: Variants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeOut } },
};

// ============================================================================
// OVERLAY & MODAL
// ============================================================================

export const backdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: easeOutBack } },
  exit: { opacity: 0, y: 40, scale: 0.95 },
};

export const overlaySlideUp: Variants = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
};

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export const createVariant = (
  initial: Record<string, number>,
  animate: Record<string, number>,
  exit?: Record<string, number>,
  transition?: Transition
): Variants => ({
  initial,
  animate,
  exit: exit || initial,
  transition: transition || normalTransition,
});
