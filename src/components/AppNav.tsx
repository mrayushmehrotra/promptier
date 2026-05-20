'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/main", label: "Feed", icon: "grid_view" },
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/create", label: "Create", icon: "add_circle" },
]

export default function AppNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#030308]/90 border-b border-white/8 backdrop-blur-xl flex items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-8 group">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-cyan-400 font-bold text-sm">P</span>
          </div>
          <span className="font-bold tracking-tighter text-white text-sm hidden sm:block">PROMPTIER</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-gray-400 text-sm cursor-pointer hover:bg-white/8 transition-colors w-48">
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span className="text-xs">Search prompts…</span>
            <span className="ml-auto text-[10px] border border-white/20 rounded px-1 py-0.5">⌘K</span>
          </div>

          {/* Create CTA (mobile) */}
          <Link
            href="/create"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </nav>


      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#030308]/95 border-b border-white/8 backdrop-blur-xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}</style>
    </>
  )
}
