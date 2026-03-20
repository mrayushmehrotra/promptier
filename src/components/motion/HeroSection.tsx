import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .hero-root {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .hero-bg-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(255, 180, 100, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 200, 150, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 160, 80, 0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
    pointer-events: none;
  }

  .hero-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 180, 100, 0.15) 0%, transparent 70%);
    filter: blur(80px);
    animation: pulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  .hero-glow-1 {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .hero-glow-2 {
    bottom: 20%;
    right: 15%;
    animation-delay: 2s;
    opacity: 0.7;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }

  .hero-gallery {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .hero-gallery-item {
    position: absolute;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    cursor: pointer;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }

  .hero-gallery-item:hover {
    transform: scale(1.05) !important;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    z-index: 10;
  }

  .hero-gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-content {
    position: relative;
    z-index: 100;
    text-align: center;
    max-width: 900px;
    padding: 0 2rem;
    pointer-events: auto;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 180, 100, 0.1);
    border: 1px solid rgba(255, 180, 100, 0.2);
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 200, 150, 0.9);
    letter-spacing: 0.02em;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
  }

  .hero-badge.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-badge-dot {
    width: 8px;
    height: 8px;
    background: #ffb060;
    border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .hero-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 400;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 1.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
    text-shadow: 0 4px 40px rgba(0, 0, 0, 0.8);
  }

  .hero-headline.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-headline-accent {
    background: linear-gradient(135deg, #ffb060 0%, #ff8c40 50%, #ffb060 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtext {
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.7;
    letter-spacing: 0.01em;
    margin: 0 auto 2.5rem;
    max-width: 600px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
  }

  .hero-subtext.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s;
  }

  .hero-actions.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, #ffb060 0%, #ff8c40 100%);
    color: #0a0a0a;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 100px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 20px rgba(255, 140, 64, 0.3);
  }

  .hero-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(255, 140, 64, 0.4);
  }

  .hero-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: transparent;
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .hero-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease 1s, transform 0.8s ease 1s;
  }

  .hero-stats.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-stat {
    text-align: center;
  }

  .hero-stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .hero-stat-label {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
  }

  .hero-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%);
    pointer-events: none;
    z-index: 50;
  }

  .hero-scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.8s ease 1.2s;
    animation: bounce 2s ease-in-out infinite;
  }

  .hero-scroll-indicator.visible {
    opacity: 1;
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  .hero-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
  }

  @media (max-width: 640px) {
    .hero-stats {
      gap: 1.5rem;
    }
    .hero-stat-value {
      font-size: 1.5rem;
    }
  }
`;

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const GALLERY_IMAGES = [
  { src: '/assets/hero_image2.webp', alt: 'Hero landscape', x: '8%', y: '15%', size: '180px', rotate: '-8deg', delay: '0s' },
  { src: '/assets/hero_images3.jpeg', alt: 'Hero portrait', x: '75%', y: '12%', size: '140px', rotate: '12deg', delay: '0.2s' },
  { src: '/assets/landscape.webp', alt: 'Landscape', x: '5%', y: '55%', size: '160px', rotate: '6deg', delay: '0.4s' },
  { src: '/assets/square.webp', alt: 'Square', x: '78%', y: '60%', size: '130px', rotate: '-10deg', delay: '0.6s' },
  { src: '/assets/ai-selfie-with-celebrity-3.avif', alt: 'AI Portrait', x: '15%', y: '75%', size: '120px', rotate: '8deg', delay: '0.8s' },
  { src: '/assets/hero_image2.webp', alt: 'Hero 2', x: '70%', y: '80%', size: '150px', rotate: '-5deg', delay: '1s' },
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomX?: number;
  randomY?: number;
  randomRotate?: number;
  imageSrc: string;
  imageSize: number;
}

export default function FlowHero() {
  const [ready, setReady] = useState(false);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const idCounter = useRef<number>(0);

  const IMAGE_SOURCES = [
    '/assets/hero_image2.webp',
    '/assets/hero_images3.jpeg',
    '/assets/landscape.webp',
    '/assets/square.webp',
    '/assets/ai-selfie-with-celebrity-3.avif',
  ];

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const getRandomImage = () => IMAGE_SOURCES[Math.floor(Math.random() * IMAGE_SOURCES.length)];

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTrail(prev => {
      let newTrail = [...prev];
      if (newTrail.length === 0) {
        newTrail.push({
          id: idCounter.current++,
          x: mouseX,
          y: mouseY,
          angle: 0,
          randomX: Math.random() * 15 - 7.5,
          randomY: Math.random() * 15 - 7.5,
          randomRotate: Math.random() * 20 - 10,
          imageSrc: getRandomImage(),
          imageSize: 70
        });
      } else {
        const last = newTrail[newTrail.length - 1];
        const dx = mouseX - last.x;
        const dy = mouseY - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= 60) {
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
          rawAngle = ((rawAngle + 180) % 360) - 180;
          const steps = Math.floor(distance / 60);
          for (let i = 1; i <= steps; i++) {
            const t = (60 * i) / distance;
            newTrail.push({
              id: idCounter.current++,
              x: last.x + dx * t,
              y: last.y + dy * t,
              angle: rawAngle,
              randomX: Math.random() * 15 - 7.5,
              randomY: Math.random() * 15 - 7.5,
              randomRotate: Math.random() * 20 - 10,
              imageSrc: getRandomImage(),
              imageSize: 50 + Math.random() * 40
            });
          }
        }
      }
      if (newTrail.length > 12) {
        newTrail = newTrail.slice(newTrail.length - 12);
      }
      return newTrail;
    });
    lastMoveTimeRef.current = Date.now();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 80) {
        setTrail(prev => prev.length > 0 ? prev.slice(1) : prev);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div ref={containerRef} className="hero-root">
        <div className="hero-bg-pattern" />
        <div className="hero-grid" />
        
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-vignette" />

        <div className="hero-gallery">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className="hero-gallery-item"
              style={{
                left: img.x,
                top: img.y,
                width: img.size,
                height: img.size,
                transform: `rotate(${img.rotate})`
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: parseInt(img.rotate) }}
              animate={{ opacity: 0.85, scale: 1, rotate: parseInt(img.rotate) }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: 'backOut' }}
              whileHover={{ scale: 1.08, zIndex: 100 }}
            >
              <img src={img.src} alt={img.alt} draggable={false} />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {trail.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.3, rotate: item.angle }}
              animate={{
                opacity: [0, 1, 0.7],
                scale: 1,
                x: [0, item.randomX ?? 0, (item.randomX ?? 0) * 0.5, 0],
                y: [0, item.randomY ?? 0, (item.randomY ?? 0) * 0.5, 0],
                rotate: [item.angle, item.angle + (item.randomRotate ?? 0), item.angle]
              }}
              exit={{ opacity: 0, scale: 0, rotate: item.angle + 45 }}
              transition={{
                opacity: { duration: 0.4, ease: 'easeOut' },
                scale: { duration: 0.3, ease: 'backOut' },
                x: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                y: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                rotate: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
              }}
              className="absolute pointer-events-none"
              style={{
                left: item.x,
                top: item.y,
                width: item.imageSize,
                height: item.imageSize,
                marginLeft: -item.imageSize / 2,
                marginTop: -item.imageSize / 2,
                zIndex: 200
              }}
            >
              <img
                src={item.imageSrc}
                alt=""
                className="w-full h-full object-cover rounded-lg"
                style={{ borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                draggable={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="hero-content">
          <motion.div
            className={`hero-badge ${ready ? "visible" : ""}`}
          >
            <span className="hero-badge-dot" />
            <span>AI-Powered Prompt Library</span>
          </motion.div>

          <h1 className={`hero-headline ${ready ? "visible" : ""}`}>
            Prompt Templates for{" "}
            <span className="hero-headline-accent">Modern AI</span> Workflows
          </h1>

          <p className={`hero-subtext ${ready ? "visible" : ""}`}>
            Copy, paste, and create — prompts for videos, images, and content 
            powered by the latest AI models. Streamline your creative process.
          </p>

          <div className={`hero-actions ${ready ? "visible" : ""}`}>
            <a href="#" className="hero-btn-primary">
              Get Started Free <ArrowIcon />
            </a>
            <a href="#" className="hero-btn-secondary">
              <PlayIcon /> Watch Demo
            </a>
          </div>

          <div className={`hero-stats ${ready ? "visible" : ""}`}>
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Prompts</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">50+</div>
              <div className="hero-stat-label">Categories</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">10K+</div>
              <div className="hero-stat-label">Users</div>
            </div>
          </div>
        </div>

        <div className={`hero-scroll-indicator ${ready ? "visible" : ""}`}>
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </>
  );
}
