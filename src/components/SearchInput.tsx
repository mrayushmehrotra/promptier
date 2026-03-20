"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, hoverScale, pressScale, normalTransition } from "@/lib/animations";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search images..." }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const handleClear = () => {
    onChange("");
  };

  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="relative">
        {/* Search Icon */}
        <motion.div
          animate={{
            color: isFocused ? "#a855f7" : "#9ca3af",
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {hasValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={normalTransition}
              whileHover={hoverScale.hover}
              whileTap={pressScale.press}
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Focus Ring Animation */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1 : 0.95,
        }}
        transition={normalTransition}
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none -z-10 blur-xl"
      />
    </motion.div>
  );
}

export default SearchInput;
