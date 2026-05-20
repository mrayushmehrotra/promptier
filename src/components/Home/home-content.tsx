'use client'
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"

const prompts = [
  {
    title: "Neon Cyberpunk Samurai",
    image: "https://images.unsplash.com/photo-1550684848-f38266c43784?w=800&q=80",
    prompt: "A lone samurai standing in the rain in a neon-lit Tokyo street, cyberpunk aesthetic, vibrant pink and blue lights reflecting on wet pavement, cinematic composition, 8k resolution, unreal engine 5 render --ar 16:9 --v 6",
    tags: ["Midjourney", "Character"],
  },
  {
    title: "Ethereal Dreamscape",
    image: "https://images.unsplash.com/photo-1579546929518-9b42468b22be?w=800&q=80",
    prompt: "Floating islands in a pastel sky, waterfalls defying gravity, soft volumetric lighting, dreamlike atmosphere, fantasy art, highly detailed, matte painting, concept art by James Jean --ar 3:2 --stylize 250",
    tags: ["Midjourney", "Landscape"],
  },
  {
    title: "Retro Synthwave Car",
    image: "https://images.unsplash.com/photo-1535385793534-6a103e4e1354?w=800&q=80",
    prompt: "Red sports car driving down a palm tree highway at sunset, retro 1980s synthwave style, orange and purple gradient sky, grid floor, chrome details, 3D render, octane render, 4k --ar 16:9",
    tags: ["DALL-E", "Vehicle"],
  },
  {
    title: "Gothic Architecture Interior",
    image: "https://images.unsplash.com/photo-1548625149-f3ef973b5e47?w=800&q=80",
    prompt: "Massive gothic cathedral interior, light beams shining through stained glass windows, dust particles floating in air, moody dark atmosphere, photorealistic, wide angle lens, 24mm, f/1.8, dramatic shadows",
    tags: ["Stable Diffusion", "Interior"],
  },
  {
    title: "Cute Robot Companion",
    image: "https://images.unsplash.com/photo-1535378437327-b7149b379c7a?w=800&q=80",
    prompt: "Adorable rusty robot sitting on a wooden desk next to a window, bokeh background, warm sunlight, pixar style 3D character, big expressive eyes, cozy cottagecore setting, detailed textures --ar 1:1",
    tags: ["Midjourney", "3D"],
  },
  {
    title: "Abstract Fluid Art",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    prompt: "Abstract fluid art with liquid gold and deep teal colors mixing together, marble texture, macro photography style, luxurious, high contrast, sharp details, glossy finish, seamless pattern --ar 9:16",
    tags: ["DALL-E", "Abstract"],
  },
]

function PromptCard({ item }: { item: typeof prompts[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }

  const rotateX = (mousePos.y - 128) / 20
  const rotateY = (128 - mousePos.x) / 20

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="glass-panel rounded-2xl overflow-hidden cursor-pointer h-full"
        style={{
          transform: isHovered ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)` : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          transition: "transform 0.1s",
        }}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-cyan-500 hover:border-cyan-400 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6 relative">
          <div className="flex items-center gap-2 mb-3">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
            "{item.prompt.substring(0, 80)}..."
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {Math.floor(Math.random() * 5000) + 500}
            </div>
            <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              Copy Prompt
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MagneticButton({ children, className = "", ...props }: { children: React.ReactNode; className?: string; onClick?: () => void; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setPosition({
      x: (x - centerX) / 4,
      y: (y - centerY) / 4,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = props.href ? "a" : "button"
  
  return (
    <Component
      ref={ref as any}
      className={`magnetic-btn relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  )
}

export default function HomeContent() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const galleryRef = useRef(null)
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" })

  const mousePositionRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Re-initialize particles on resize to fit new dimensions
      particlesRef.current = Array.from({ length: Math.floor((canvas.width * canvas.height) / 9000) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      }))
    }
    
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mousePositionRef.current.x
      const mouseY = mousePositionRef.current.y

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (150 - distance) / 150
          p.x -= forceDirectionX * force * 2
          p.y -= forceDirectionY * force * 2
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          
          if (distance2 < 120) {
            const opacity = (1 - distance2 / 120) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])


  return (
    <div className="min-h-screen bg-[#030308] text-white overflow-x-hidden font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full z-[9999] pointer-events-none" 
           style={{ transform: "translate(-50%, -50%)", boxShadow: "0 0 10px #06b6d4, 0 0 20px #06b6d4" }} />
      <div className="cursor-outline hidden md:block fixed top-0 left-0 w-10 h-10 border border-cyan-500/50 rounded-full z-[9999] pointer-events-none transition-all duration-200"
           style={{ transform: "translate(-50%, -50%)", mixBlendMode: "difference" }} />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03]" 
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="text-cyan-400 text-lg">P</span>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">PROMPTIER</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/main" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">Explore</Link>
            <a href="#features" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">Features</a>
            <a href="#pro" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">Pro</a>
            <Link href="/main" className="magnetic-btn relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 px-6 py-2.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030308] z-10 pointer-events-none" />

        <div className="relative z-20 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-medium text-cyan-300 tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AI Prompt Library
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: 120, skewY: 7 }}
                animate={heroInView ? { y: 0, skewY: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="block"
              >
                COPY.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: 120, skewY: 7 }}
                animate={heroInView ? { y: 0, skewY: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.45 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              >
                GENERATE.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: 120, skewY: 7 }}
                animate={heroInView ? { y: 0, skewY: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="block"
              >
                CREATE.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12"
          >
            Stop guessing. Browse thousands of battle-tested prompts, copy them in one click, and generate stunning AI art that matches your vision perfectly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/main" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full overflow-hidden transition-all duration-300">
              <span className="flex items-center gap-2">
                Explore Prompts
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <a href="#how-it-works" className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:bg-white/5">
              How it Works
            </a>
          </motion.div>


          {/* Floating Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="glass-panel p-4 rounded-xl hover:rotate-0 transition-transform duration-500 w-64 rotate-[-6deg]"
            >
              <div className="h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
              <div className="h-2 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-2 bg-white/10 rounded w-1/2" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.6 }}
            className="absolute top-1/3 right-10 hidden lg:block"
          >
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass-panel p-4 rounded-xl hover:rotate-0 transition-transform duration-500 w-56 rotate-[6deg]"
            >
              <div className="h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-3xl">🔥</span>
              </div>
              <div className="h-2 bg-white/10 rounded w-full mb-2" />
              <div className="h-2 bg-white/10 rounded w-2/3" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm relative z-20 overflow-hidden">
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div 
            className="inline-flex text-4xl md:text-6xl font-display font-bold text-white/5 uppercase tracking-widest"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="mx-8">Prompts</span>
                <span className="text-cyan-500/20">•</span>
                <span className="mx-8">Images</span>
                <span className="text-cyan-500/20">•</span>
                <span className="mx-8">Copy</span>
                <span className="text-cyan-500/20">•</span>
                <span className="mx-8">Generate</span>
                <span className="text-cyan-500/20">•</span>
                <span className="mx-8">Create</span>
                <span className="text-cyan-500/20">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <section id="explore" className="relative z-20 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Trending Prompts</h2>
              <p className="text-gray-400 max-w-xl">
                Hand-picked, high-quality prompts that produce consistent, stunning results across Midjourney, DALL-E, and Stable Diffusion.
              </p>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0">
              <button className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm border border-cyan-500/30">All</button>
              <button className="px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm border border-white/10 hover:bg-white/10 transition-colors">Midjourney</button>
              <button className="px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm border border-white/10 hover:bg-white/10 transition-colors">DALL-E</button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((item, index) => (
              <PromptCard key={index} item={item} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <MagneticButton className="px-8 py-4 rounded-full border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 text-lg">
              Load More Prompts
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-20 py-24 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📋", title: "Copy Instantly", desc: "Every prompt is just one click away. Our smart copy button captures the exact syntax, including parameters and aspect ratios." },
              { icon: "🎨", title: "Visual Preview", desc: "See exactly what a prompt generates before you even open your AI tool. We display the exact output for transparency." },
              { icon: "⚡", title: "Optimized", desc: "Prompts are curated and optimized by the community. Upvote the best ones and filter by style, model, or aspect ratio." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-2xl group hover:border-cyan-500/30 transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 text-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
            style={{ textShadow: "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)" }}
          >
            Ready to create?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-gray-300 mb-10"
          >
            Join 10,000+ creators sharing and discovering AI prompts daily.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MagneticButton className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Start Browsing Free
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-black/80 backdrop-blur-xl pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">P</div>
            PROMPTIER
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="text-sm text-gray-600">Promptier. Built for creators.</div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div id="toast" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 bg-cyan-500 text-black font-bold rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-2 translate-y-28 opacity-0 transition-all duration-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Prompt Copied to Clipboard!
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --accent: #06b6d4;
          --accent-glow: rgba(6, 182, 212, 0.5);
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4, .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .cursor-dot, .cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
        }

        .cursor-outline {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(6, 182, 212, 0.5);
          transition: width 0.2s, height 0.2s, background-color 0.2s;
          mix-blend-mode: difference;
        }

        .cursor-outline:hover {
          width: 60px;
          height: 60px;
          background: rgba(6, 182, 212, 0.1);
          border-color: transparent;
        }
      `}</style>
    </div>
  )
}