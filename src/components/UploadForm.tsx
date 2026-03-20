"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Plus, X } from "lucide-react";
import { AI_SOURCE } from "@/lib/types";
import {
  scaleIn,
  hoverScale,
  pressScale,
  fadeIn,
  normalTransition,
  gentleSpring,
} from "@/lib/animations";

interface UploadFormProps {
  onSubmit: (base64Data: string, prompt: string, aiSource: string) => void;
  isUploading: boolean;
}

export function UploadForm({ onSubmit, isUploading }: UploadFormProps) {
  const [prompt, setPrompt] = useState("");
  const [aiSource, setAiSource] = useState(AI_SOURCE.DALL_E);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !preview) return;
    onSubmit(preview, prompt, aiSource);
    setPrompt("");
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <motion.section
      initial={scaleIn.initial}
      animate={scaleIn.animate}
      transition={gentleSpring}
      className="max-w-2xl mx-auto glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden group"
    >
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-accent/5 blur-[100px] -z-10"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-tr from-accent/5 to-transparent blur-[60px] -z-10" />

      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={normalTransition}
        >
          <Plus className="w-5 h-5 text-accent" />
        </motion.div>
        <div>
          <h2 className="text-xl font-semibold">Vault New Image</h2>
          <p className="text-xs text-muted-foreground">Add your AI-generated masterpiece</p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Area */}
        <motion.div
          onClick={() => !preview && fileInputRef.current?.click()}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ delay: 0.2 }}
          whileHover={!preview ? { scale: 1.02, borderColor: "rgba(168,85,247,0.3)" } : undefined}
          className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3
            ${preview ? "border-accent/50" : "border-white/10 bg-white/5"}
          `}
        >
          {preview ? (
            <>
              <motion.img
                src={preview}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={normalTransition}
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={normalTransition}
              />
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(239,68,68,0.9)" }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-2.5 bg-black/60 backdrop-blur-md rounded-full text-white z-10"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center text-accent"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={gentleSpring}
              >
                <Upload className="w-7 h-7" />
              </motion.div>
              <motion.div
                className="text-center"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ delay: 0.1 }}
              >
                <p className="font-semibold text-foreground mb-1">Click to upload image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 10MB</p>
              </motion.div>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-semibold text-foreground ml-1 flex items-center gap-2">
            <span>What was the prompt?</span>
            <span className="text-xs text-muted-foreground font-normal">Required</span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A majestic lion wearing a golden crown in a mystical forest..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all resize-none hover:bg-white/10"
            aria-label="Image prompt description"
            aria-describedby="prompt-help"
          />
          <motion.p
            className="text-xs text-muted-foreground ml-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {prompt.length} characters
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-4"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">AI Model Source</label>
            <select
              value={aiSource}
              onChange={(e) => setAiSource(e.target.value as typeof AI_SOURCE.DALL_E)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all appearance-none hover:bg-white/10 cursor-pointer"
              aria-label="Select AI model source"
            >
              <option value={AI_SOURCE.DALL_E}>ChatGPT (DALL-E 3)</option>
              <option value={AI_SOURCE.GOOGLE_NANO}>Google Nano Banana</option>
              <option value={AI_SOURCE.MIDJOURNEY}>Midjourney v6</option>
              <option value={AI_SOURCE.STABLE_DIFFUSION}>Stable Diffusion XL</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={!prompt || !preview || isUploading}
            whileHover={{ scale: !isUploading && prompt && preview ? 1.02 : 1, opacity: !isUploading && prompt && preview ? 0.95 : 0.5 }}
            whileTap={!isUploading && prompt && preview ? { scale: 0.95 } : undefined}
            className="self-end h-12 px-8 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white font-semibold transition-all disabled:scale-100 flex items-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 disabled:shadow-none"
            aria-label={isUploading ? "Vaulting image..." : "Vault image"}
          >
            {isUploading ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Vaulting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Vault Image
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.section>
  );
}
