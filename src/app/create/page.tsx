'use client'
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import AppNav from "@/components/AppNav"
import { ALL_MODELS, ALL_TAGS } from "@/lib/mock-data"

export default function CreatePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState(ALL_MODELS[0])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const [imageData, setImageData] = useState<string | null>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    
    // For preview
    const url = URL.createObjectURL(file)
    setPreview(url)

    // For upload (Base64)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageData(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const addTag = (tag: string) => {
    const clean = tag.trim().replace(/^#/, "")
    if (clean && !tags.includes(clean) && tags.length < 5) {
      setTags([...tags, clean])
    }
    setTagInput("")
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(tagInput)
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags(tags.slice(0, -1))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageData || !prompt || !title) return
    
    setSubmitting(true)
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          image: imageData,
          prompt: prompt.substring(0, 100) + "...",
          fullPrompt: prompt,
          tags,
          model,
        }),
      })

      if (!response.ok) throw new Error("Failed to publish")

      setSuccess(true)
      setTimeout(() => router.push("/main"), 2000)
    } catch (error) {
      console.error(error)
      alert("Error publishing prompt. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }


  const MODEL_COLORS: Record<string, string> = {
    Midjourney: "border-blue-500/50 bg-blue-500/10 text-blue-400",
    "DALL-E": "border-green-500/50 bg-green-500/10 text-green-400",
    "Stable Diffusion": "border-orange-500/50 bg-orange-500/10 text-orange-400",
    Flux: "border-pink-500/50 bg-pink-500/10 text-pink-400",
    Firefly: "border-lime-500/50 bg-lime-500/10 text-lime-400",
  }

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      <AppNav />
      <div className="pt-14 max-w-4xl mx-auto px-4 md:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Share a Prompt</h1>
            <p className="text-gray-400 mt-2 text-sm">Upload your AI-generated image and the prompt that created it.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Image <span className="text-cyan-400">*</span>
              </label>
              <div
                onClick={() => !preview && fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                  preview
                    ? "border-transparent cursor-default"
                    : dragOver
                    ? "border-cyan-400 bg-cyan-500/5 cursor-copy"
                    : "border-white/15 bg-white/3 hover:border-white/30 hover:bg-white/5 cursor-pointer"
                }`}
              >
                <AnimatePresence mode="wait">
                  {preview ? (
                    <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                      <img src={preview} alt="Preview" className="w-full max-h-[480px] object-contain rounded-2xl" />
                      <button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-red-500 transition-colors text-sm"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 px-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-3xl">
                        🖼️
                      </div>
                      <p className="text-white font-medium mb-1">Drop your image here</p>
                      <p className="text-gray-500 text-sm">or click to browse · PNG, JPG, WEBP up to 20MB</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your creation a catchy name…"
                maxLength={80}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                required
              />
              <p className="text-right text-[10px] text-gray-600 mt-1">{title.length}/80</p>
            </div>

            {/* Full Prompt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Full Prompt <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => { setPrompt(e.target.value); setCharCount(e.target.value.length) }}
                  placeholder="Paste your complete prompt here, including all parameters (--ar, --v, --stylize, etc.)…"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm font-mono resize-none"
                  required
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {prompt && (
                    <button
                      type="button"
                      onClick={() => { navigator.clipboard.writeText(prompt) }}
                      className="text-[10px] text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded border border-white/10 hover:border-cyan-500/30"
                    >
                      Copy
                    </button>
                  )}
                  <span className="text-[10px] text-gray-600">{charCount} chars</span>
                </div>
              </div>
            </div>

            {/* Model selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">AI Model</label>
              <div className="flex flex-wrap gap-2">
                {ALL_MODELS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModel(m)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      model === m ? MODEL_COLORS[m] : "border-white/10 bg-white/3 text-gray-400 hover:bg-white/8"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Tags <span className="text-gray-600">(up to 5)</span>
              </label>
              <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-white/5 border border-white/10 focus-within:border-cyan-500/50 transition-all min-h-[48px] items-center">
                {tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs">
                    #{tag}
                    <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-white">
                      ×
                    </button>
                  </span>
                ))}
                {tags.length < 5 && (
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={() => tagInput && addTag(tagInput)}
                    placeholder={tags.length === 0 ? "Add tags… (press Enter or comma)" : ""}
                    className="flex-1 min-w-[120px] bg-transparent text-white placeholder:text-gray-600 text-sm focus:outline-none"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-gray-600">Suggestions:</span>
                {ALL_TAGS.filter((t) => !tags.includes(t)).slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/8">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  By posting, you agree to our <span className="text-cyan-400 hover:underline cursor-pointer">content guidelines</span>.
                </p>
                <button
                  type="submit"
                  disabled={!preview || !prompt || !title || submitting || success}
                  className={`relative px-8 py-3 rounded-xl font-bold text-sm transition-all overflow-hidden ${
                    success
                      ? "bg-green-500/20 border border-green-500/40 text-green-400"
                      : !preview || !prompt || !title
                      ? "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Publishing…
                    </span>
                  ) : success ? (
                    "✓ Published!"
                  ) : (
                    "Publish Prompt"
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
