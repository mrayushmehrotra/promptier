"use client";

import { motion } from "framer-motion";
import { shimmer } from "@/lib/animations";

interface SkeletonProps {
  variant?: "card" | "text" | "circle" | "rect";
  className?: string;
}

export function Skeleton({ variant = "card", className = "" }: SkeletonProps) {
  const baseClasses = "bg-gray-200 dark:bg-gray-700 overflow-hidden";

  const variantClasses = {
    card: "rounded-xl h-64",
    text: "rounded h-4 w-full",
    circle: "rounded-full h-16 w-16",
    rect: "rounded-lg h-20 w-full",
  };

  const shimmerClasses = "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]";

  return (
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${shimmerClasses}`}
    />
  );
}

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 8 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  );
}

export default Skeleton;
