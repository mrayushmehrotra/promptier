import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import AppNav from "@/components/AppNav"

const MODEL_BADGE: Record<string, string> = {
  Midjourney: "bg-blue-950 text-blue-300 border border-blue-500/30",
  "DALL-E": "bg-green-950 text-green-300 border border-green-500/30",
  "Stable Diffusion": "bg-orange-950 text-orange-300 border border-orange-500/30",
  Flux: "bg-pink-950 text-pink-300 border border-pink-500/30",
  Firefly: "bg-lime-950 text-lime-300 border border-lime-500/30",
}

function PostCard({ post, index }: { post: any; index: number }) {
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(post.fullPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group break-inside-avoid mb-5"
    >
      <Link href={`/posts/${post._id}`}>
        <div className="overflow-hidden rounded-2xl bg-white/3 border border-white/8 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]">
          <div className="relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${MODEL_BADGE[post.model] ?? ""}`}>
                {post.model}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-cyan-500 text-white text-xs font-bold"
            >
              {copied ? "✓" : "⎘"}
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-sm text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {post.title}
            </h3>
            <p className="text-gray-500 text-[11px] font-mono line-clamp-2 leading-relaxed mb-3">&quot;{post.prompt}&quot;</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-gray-400">#{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <img src={post.author.avatar} alt={post.author.username} className="w-5 h-5 rounded-full object-cover" />
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{post.author.username}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <button
                  onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
                  className={`flex items-center gap-1 transition-colors ${liked ? "text-pink-400" : "hover:text-pink-400"}`}
                >
                  {liked ? "♥" : "♡"} {post.likes + (liked ? 1 : 0)}
                </button>
                <span>👁 {(post.views / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const tabs = ["All", "Favorites", "Recent"]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        if (Array.isArray(data)) {
          setPosts(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filtered = activeTab === "Recent"
    ? [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : activeTab === "Favorites"
    ? [...posts].sort((a, b) => b.likes - a.likes)
    : posts

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      <AppNav />
      <div className="pt-14">
        <div className="sticky top-14 z-30 bg-[#030308]/95 backdrop-blur-xl border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab ? "text-cyan-400 bg-cyan-500/10" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Link
              href="/create"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-50 text-black text-xs font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              + New Post
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No posts yet. Be the first to share one!</p>
              <Link href="/create" className="text-cyan-400 hover:underline mt-2 inline-block">Create Post →</Link>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
              {filtered.map((post, i) => (
                <PostCard key={post._id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

