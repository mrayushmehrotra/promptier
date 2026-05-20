import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import AppNav from "@/components/AppNav"

const MODEL_BADGE: Record<string, string> = {
  Midjourney: "bg-blue-950 text-blue-300 border border-blue-500/30",
  "DALL-E": "bg-green-950 text-green-300 border border-green-500/30",
  "Stable Diffusion": "bg-orange-950 text-orange-300 border border-orange-500/30",
  Flux: "bg-pink-950 text-pink-300 border border-pink-500/30",
  Firefly: "bg-lime-950 text-lime-300 border border-lime-500/30",
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        src={src}
        alt="Full size"
        className="max-w-full max-h-full object-contain rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        ✕
      </button>
    </motion.div>
  )
}

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<any[]>([])
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setPost(data)
          setComments(data.comments || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  const handleCopyPrompt = () => {
    if (!post) return
    navigator.clipboard.writeText(post.fullPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    setComments([
      ...comments,
      {
        id: `c_${Date.now()}`,
        author: { username: "Guest", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" },
        body: comment.trim(),
        createdAt: new Date().toISOString(),
      },
    ])
    setComment("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030308] text-white flex flex-col items-center justify-center">
        <AppNav />
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#030308] text-white flex flex-col items-center justify-center">
        <AppNav />
        <p className="text-gray-400 text-xl mt-20">Post not found</p>
        <Link href="/main" className="mt-4 text-cyan-400 hover:underline text-sm">Back to Feed</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      <AppNav />
      <AnimatePresence>{lightbox && <Lightbox src={post.image} onClose={() => setLightbox(false)} />}</AnimatePresence>

      <div className="pt-14 max-w-6xl mx-auto px-4 md:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/main" className="hover:text-white transition-colors">Feed</Link>
            <span>›</span>
            <span className="text-gray-300 truncate max-w-[200px]">{post.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-6">
              <div
                onClick={() => setLightbox(true)}
                className="relative rounded-2xl overflow-hidden cursor-zoom-in group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-2xl flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    🔍 Click to expand
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/3 border border-white/8 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">prompt.txt</span>
                  </div>
                  <button
                    onClick={handleCopyPrompt}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      copied
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25"
                    }`}
                  >
                    {copied ? "✓ Copied!" : "⎘ Copy Prompt"}
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                    {post.fullPrompt}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Comments ({comments.length})
                </h2>

                <form onSubmit={handleComment} className="flex gap-3 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80"
                    alt="you"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment…"
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-sm font-medium hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Post
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  <AnimatePresence>
                    {comments.map((c: any) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <img src={c.author.avatar} alt={c.author.username} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-white">{c.author.username}</span>
                            <span className="text-[10px] text-gray-600">
                              {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">{c.body}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {comments.length === 0 && (
                    <p className="text-gray-600 text-sm text-center py-6">Be the first to comment.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{post.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${MODEL_BADGE[post.model] ?? ""}`}>
                    {post.model}
                  </span>
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-medium text-sm ${
                    liked
                      ? "bg-pink-500/15 border-pink-500/30 text-pink-400"
                      : "bg-white/3 border-white/10 text-gray-300 hover:border-pink-500/30 hover:text-pink-400"
                  }`}
                >
                  <span className="text-base">{liked ? "♥" : "♡"}</span>
                  {post.likes + (liked ? 1 : 0)} Likes
                </button>
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-medium text-sm ${
                    linkCopied
                      ? "bg-green-500/15 border-green-500/30 text-green-400"
                      : "bg-white/3 border-white/10 text-gray-300 hover:border-white/20"
                  }`}
                >
                  🔗 {linkCopied ? "Copied!" : "Share"}
                </button>
              </div>

              <div className="rounded-2xl bg-white/3 border border-white/8 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Posted by</p>
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.username}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">
                      @{post.author.username}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Community Member</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/3 border border-white/8 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Details</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Published</span>
                  <span className="text-gray-300">{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Views</span>
                  <span className="text-gray-300">{post.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Model</span>
                  <span className="text-gray-300">{post.model}</span>
                </div>
              </div>

              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent("Generate an image: " + post.fullPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl bg-cyan-50 hover:bg-white text-black font-bold text-sm text-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                ✨ Try this Prompt
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

