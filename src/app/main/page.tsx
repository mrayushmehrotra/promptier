'use client'
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const placeholderImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop", height: "h-[300px]", title: "Cyberpunk Tokyo", author: "Neo" },
    { id: 2, src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=600&auto=format&fit=crop", height: "h-[450px]", title: "Lost in the Dunes", author: "Nomad" },
    { id: 3, src: "https://images.unsplash.com/photo-1707343848511-925515be431f?q=80&w=600&auto=format&fit=crop", height: "h-[250px]", title: "Glitch Reality", author: "Cyborg" },
    { id: 4, src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop", height: "h-[500px]", title: "Neon Forest", author: "Druid" },
    { id: 5, src: "https://images.unsplash.com/photo-1707343843344-01974ef49610?q=80&w=600&auto=format&fit=crop", height: "h-[320px]", title: "Digital Bloom", author: "Botanist" },
    { id: 6, src: "https://images.unsplash.com/photo-1707343843598-397505ef4ed6?q=80&w=600&auto=format&fit=crop", height: "h-[400px]", title: "The Void", author: "Vanta" },
    { id: 7, src: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=600&auto=format&fit=crop", height: "h-[380px]", title: "Sunset Waves", author: "Sol" },
    { id: 8, src: "https://images.unsplash.com/photo-1707343843913-0ec3531b7e4a?q=80&w=600&auto=format&fit=crop", height: "h-[420px]", title: "Mirror World", author: "Echo" },
    { id: 9, src: "https://images.unsplash.com/photo-1707343845451-24fb2f275997?q=80&w=600&auto=format&fit=crop", height: "h-[280px]", title: "Abstract Flow", author: "Fluid" },
    { id: 10, src: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c?q=80&w=600&auto=format&fit=crop", height: "h-[460px]", title: "Golden Hour", author: "Aura" },
    { id: 11, src: "https://images.unsplash.com/photo-1707343843861-124c3c869fb0?q=80&w=600&auto=format&fit=crop", height: "h-[310px]", title: "The Core", author: "Magma" },
    { id: 12, src: "https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=600&auto=format&fit=crop", height: "h-[350px]", title: "Arctic Night", author: "Frost" },
]

export default function Main() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="p-4 md:p-8">
                {/* Search / Filter header */}
                <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-md group">
                        <input
                            type="text"
                            placeholder="Search your vault..."
                            className="w-full px-6 py-3 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-black transition-all outline-none font-medium"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">
                            ⌘ K
                        </div>
                    </div>

                    <div className="flex items-center gap-6 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
                        {['All', 'Favorites', 'Recent', 'Collections'].map((tab) => (
                            <button key={tab} className="font-bold uppercase text-xs tracking-widest hover:text-gray-500 transition-colors whitespace-nowrap">
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pinterest Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 max-w-7xl mx-auto">
                    {placeholderImages.map((img, i) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="relative mb-4 break-inside-avoid group cursor-zoom-in"
                        >
                            <div className={`relative overflow-hidden rounded-2xl bg-gray-100 w-full ${img.height}`}>
                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                                    <div className="flex justify-end">
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">
                                            Save
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                            </button>
                                            <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors text-xs font-black">
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="mt-2 px-1">
                                <h3 className="text-sm font-bold truncate">{img.title}</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider transition-colors hover:text-black hover:underline cursor-pointer">
                                        {img.author}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
