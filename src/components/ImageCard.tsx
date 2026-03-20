"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import type { AIImage } from "@/lib/types";
import {
  fadeIn,
  hoverLift,
  pressScale,
  imageReveal,
  overlaySlideUp,
  normalTransition,
  gentleSpring,
} from "@/lib/animations";

interface ImageCardProps {
  image: AIImage;
  delay?: number;
}

function ImageCardComponent({ image, delay = 0 }: ImageCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={{ delay, ...gentleSpring }}
      whileHover={hoverLift.hover}
      className="group relative glass rounded-3xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-500"
    >
      <div className="aspect-square relative overflow-hidden">
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"
          />
        )}
        <motion.img
          src={image.base64Data}
          alt={image.prompt}
          loading="lazy"
          variants={imageReveal}
          initial="initial"
          animate="animate"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <AnimatePresence>
          {imageLoaded && (
            <motion.div
              variants={overlaySlideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={normalTransition}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ...normalTransition }}
                className="space-y-3"
              >
                <p className="text-sm text-white/95 line-clamp-3 font-medium leading-relaxed">
                  {image.prompt}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <motion.span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-accent/20 to-accent-light/20 text-white backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {image.aiSource}
                  </motion.span>
                  <motion.button
                    onClick={() => copyToClipboard(image.prompt)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    variants={pressScale}
                    className="p-2.5 rounded-full bg-gradient-to-r from-accent to-accent-light text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40"
                    title="Copy Prompt"
                    aria-label="Copy image prompt to clipboard"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={copied ? "check" : "copy"}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ ...gentleSpring }}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 flex items-center justify-between md:hidden glass-sm border-t border-white/5"
      >
        <p className="text-xs font-medium truncate flex-1 mr-3 text-foreground">{image.prompt}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => copyToClipboard(image.prompt)}
          className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors flex-shrink-0"
          title="Copy Prompt"
          aria-label="Copy image prompt to clipboard"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={copied ? "check" : "copy"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={gentleSpring}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export const ImageCard = memo(ImageCardComponent, (prev, next) => {
  return prev.image.id === next.image.id &&
    prev.image.prompt === next.image.prompt &&
    prev.image.aiSource === next.image.aiSource &&
    prev.image.base64Data === next.image.base64Data;
});
