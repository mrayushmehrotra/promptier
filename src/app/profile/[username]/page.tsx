'use client'
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import AppNav from "@/components/AppNav"
import { MOCK_USERS, getPostsByUser } from "@/lib/mock-data"

const MODEL_BADGE: Record<string, string> = {
  Midjourney: "bg-blue-950 text-blue-300 border border-blue-500/30",
  "DALL-E": "bg-green-950 text-green-300 border border-green-500/30",
  "Stable Diffusion": "bg-orange-950 text-orange-300 border border-orange-500/30",
  Flux: "bg-pink-950 text-pink-300 border border-pink-500/30",
  Firefly: "bg-lime-950 text-lime-300 border border-lime-500/30",
}

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string
  const user = Object.values(MOCK_USERS).find((u) => u.username === username)
  const posts = getPostsByUser(username)
  const [following, setFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts")

  if (!user) {
    return (
      <div className="min-h-screen bg-[#030308] text-white flex flex-col items-center justify-center">
        <AppNav />
        <p className="text-gray-400 text-xl mt-20">User not found</p>
        <Link href="/explore" className="mt-4 text-cyan-400 hover:underline text-sm">Back to Explore</Link>
      </div>
    )
  }

  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0)

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      <AppNav />
      <div className="pt-14">
        {/* Profile header */}
        <div className="relative overflow-hidden">
          {/* Banner */}
          <div className="h-48 bg-gradient-to-br from-cyan-900/30 via-purple-900/20 to-[#030308]" />
          
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14 mb-8">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-[#030308] shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#030308]" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">@{user.username}</h1>
                      <p className="text-gray-400 text-sm mt-0.5">Member since {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-3 md:ml-auto">
                      <button
                        onClick={() => setFollowing(!following)}
                        className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                          following
                            ? "bg-white/10 border border-white/20 text-gray-300 hover:border-red-500/30 hover:text-red-400"
                            : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        }`}
                      >
                        {following ? "Following ✓" : "Follow"}
                      </button>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm mt-3 max-w-xl leading-relaxed">{user.bio}</p>

                  {/* Stats row */}
                  <div className="flex items-center gap-6 mt-4">
                    {[
                      { label: "Posts", value: posts.length },
                      { label: "Followers", value: user.followers.toLocaleString() },
                      { label: "Total Likes", value: totalLikes.toLocaleString() },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <p className="text-xl font-bold">{value}</p>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 border-b border-white/8 mb-8">
                {(["posts", "likes"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-all ${
                      activeTab === tab
                        ? "border-cyan-400 text-cyan-400"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab} {tab === "posts" && `(${posts.length})`}
                  </button>
                ))}
              </div>

              {/* Posts grid */}
              {activeTab === "posts" && (
                <div>
                  {posts.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-gray-500 text-lg">No posts yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-16">
                      {posts.map((post, i) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <Link href={`/posts/${post.id}`} className="group block rounded-2xl overflow-hidden border border-white/8 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]">
                            <div className="relative">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-52 object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute top-2 left-2">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${MODEL_BADGE[post.model] ?? ""}`}>
                                  {post.model}
                                </span>
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{post.title}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-gray-500">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-[10px] text-gray-500">♥ {post.likes.toLocaleString()}</span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "likes" && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-4xl mb-3">🔒</p>
                  <p className="text-gray-400">Liked posts are private.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
