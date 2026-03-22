'use client'
import { motion, useInView } from "framer-motion"
import Navbar from "@/components/navbar"
import { useRef } from "react"

// Import Swiper styles
import "swiper/css";

const features = [
    {
        icon: "✦",
        title: "Curated Prompts",
        description: "Discover hand-picked, high-quality prompts from creators around the world. Every prompt is tested and refined.",
    },
    {
        icon: "⬡",
        title: "Share & Collaborate",
        description: "Publish your best prompts and get feedback from a thriving community of AI enthusiasts and professionals.",
    },
    {
        icon: "◈",
        title: "Prompt Vault",
        description: "Save your favourite prompts in a personal vault. Organise, tag, and revisit them whenever you need.",
    },
    {
        icon: "◎",
        title: "Version History",
        description: "Iterate on your prompts with full version control. See what changed, when, and why — always roll back.",
    },
];

// const stats = [
//     { value: "12K+", label: "Prompts Shared" },
//     { value: "3.4K", label: "Active Creators" },
//     { value: "98%", label: "Satisfaction Rate" },
//     { value: "50+", label: "AI Models Supported" },
// ];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="feature-card"
        >
            <span className="feature-icon">{feature.icon}</span>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.description}</p>
        </motion.div>
    );
}

// function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
//     const ref = useRef(null);
//     const inView = useInView(ref, { once: true, margin: "-60px" });

//     return (
//         <motion.div
//             ref={ref}
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={inView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
//             className="stat-item"
//         >
//             <span className="stat-value">{stat.value}</span>
//             <span className="stat-label">{stat.label}</span>
//         </motion.div>
//     );
// }

export default function HomeContent() {
    const heroRef = useRef(null);
    const sectionRef = useRef(null);
    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Navbar />

            {/* ── HERO SECTION ── */}
            <section ref={heroRef} className="hero-section">
                <div className="hero-left">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hero-eyebrow"
                    >
                        The Prompt Marketplace
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-headline"
                    >
                        WHERE GOOD PROMPTS MEET GOOD PEOPLE'S
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="hero-sub"
                    >
                        Discover, share and perfect AI prompts with a community that gets it.
                        Stop starting from scratch — build on what works.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.65 }}
                        className="hero-cta-row"
                    >
                        <a href="/signup" className="btn-primary">Get Started Free</a>
                        <a href="/gallery" className="btn-ghost">Browse Prompts →</a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-right"
                >
                    <div className="prompt-card-stack">
                        <div className="prompt-card pc-back">
                            <div className="pc-tag">Midjourney</div>
                            <p className="pc-text">A cinematic portrait of a lone astronaut standing on a red-dust crater rim at golden hour…</p>
                            <div className="pc-meta"><span>⬆ 2.1k</span><span>💬 84</span></div>
                        </div>
                        <div className="prompt-card pc-mid">
                            <div className="pc-tag">GPT-4o</div>
                            <p className="pc-text">Act as a world-class UX researcher. Analyse the following user interview transcripts and extract…</p>
                            <div className="pc-meta"><span>⬆ 3.8k</span><span>💬 142</span></div>
                        </div>
                        <div className="prompt-card pc-front">
                            <div className="pc-tag">Chatgpt</div>
                            <p className="pc-text">Hyper-realistic oil painting of a Tokyo alleyway at midnight, neon reflections on rain-slicked stone…</p>
                            <div className="pc-meta"><span>⬆ 5.2k</span><span>💬 201</span></div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── MARQUEE STRIP ── */}
            <div className="marquee-strip">
                <div className="marquee-track">
                    {[
                        { quote: "The best prompts on the entire internet that you\'ll find.", author: "Virat Kohli" },
                        { quote: "I used Promptier once. Now I only communicate in AI outputs.", author: "Elon Musk, probably" },
                        { quote: "My therapist said I needed an outlet. Promptier was cheaper.", author: "Anonymous Creator" },
                        { quote: "Forget Shakespeare — the real writers are on Promptier.", author: "William Shakespeare" },
                        { quote: "10/10 would generate a cinematic portrait of myself again.", author: "A Very Happy User" },
                    ].concat([
                        { quote: "The best prompts on the entire internet that you\'ll find.", author: "Virat Kohli" },
                        { quote: "I used Promptier once. Now I only communicate in AI outputs.", author: "Elon Musk, probably" },
                        { quote: "My therapist said I needed an outlet. Promptier was cheaper.", author: "Anonymous Creator" },
                        { quote: "Forget Shakespeare — the real writers are on Promptier.", author: "William Shakespeare" },
                        { quote: "10/10 would generate a cinematic portrait of myself again.", author: "A Very Happy User" },
                    ]).map((item, i) => (
                        <span key={i} className="marquee-quote">
                            <span className="mq-text">&ldquo;{item.quote}&rdquo;</span>
                            <span className="mq-author">— {item.author}</span>
                            <span className="mq-sep">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── FEATURES SECTION (the "after page") ── */}
            <section ref={sectionRef} className="features-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="features-header"
                >
                    <p className="section-eyebrow">WHY PROMPTIER</p>
                    <h2 className="section-title">Everything a prompt creator needs</h2>
                    <p className="section-sub">
                        A complete ecosystem built around crafting, discovering, and scaling AI prompts — so you spend less time tweaking and more time creating.
                    </p>
                </motion.div>

                <div className="features-grid">
                    {features.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="how-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="features-header"
                >
                    <p className="section-eyebrow">HOW IT WORKS</p>
                    <h2 className="section-title">Three steps to your best prompts</h2>
                </motion.div>

                <div className="steps-row">
                    {[
                        { n: "01", title: "Browse & Discover", body: "Explore thousands of prompts across categories — art, coding, writing, research and more." },
                        { n: "02", title: "Fork & Customise", body: "Clone any prompt as your starting point. Tweak the variables, test it, make it yours." },
                        { n: "03", title: "Publish & Grow", body: "Share your masterpiece with the community. Collect upvotes and build your creator profile." },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="step-card"
                        >
                            <span className="step-number">{step.n}</span>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-body">{step.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section ref={ctaRef} className="cta-section">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="cta-inner"
                >
                    <p className="section-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>READY?</p>
                    <h2 className="cta-title">Start crafting prompts that actually work.</h2>
                    <p className="cta-sub">Join thousands of creators who ship better AI results with Promptier.</p>
                    <a href="/signup" className="btn-primary btn-large">Create Free Account</a>
                </motion.div>
            </section>

            <style jsx>{`
                /* ── HERO ── */
                .hero-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 3rem;
                    min-height: 100vh;
                    padding: 6rem 6rem 4rem;
                }

                .hero-left {
                    flex: 1;
                    max-width: 560px;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .hero-eyebrow {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #888;
                }

                .hero-headline {
                    font-size: clamp(2.4rem, 4vw, 3.6rem);
                    font-weight: 900;
                    line-height: 1.05;
                    letter-spacing: -0.02em;
                    text-transform: uppercase;
                    color: #111;
                }

                .hero-sub {
                    font-size: 1.05rem;
                    line-height: 1.7;
                    color: #555;
                    max-width: 440px;
                }

                .hero-cta-row {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-top: 0.5rem;
                }

                .btn-primary {
                    display: inline-block;
                    padding: 0.75rem 1.75rem;
                    background: #111;
                    color: #fff;
                    border-radius: 999px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: background 0.2s, transform 0.15s;
                }
                .btn-primary:hover { background: #333; transform: translateY(-2px); }

                .btn-large {
                    padding: 0.95rem 2.5rem;
                    font-size: 1.05rem;
                    margin-top: 1rem;
                }

                .btn-ghost {
                    display: inline-block;
                    padding: 0.75rem 0;
                    color: #111;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    border-bottom: 2px solid #111;
                    transition: opacity 0.2s;
                }
                .btn-ghost:hover { opacity: 0.6; }

                /* ── PROMPT CARD STACK ── */
                .hero-right {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .prompt-card-stack {
                    position: relative;
                    width: 360px;
                    height: 320px;
                }

                .prompt-card {
                    position: absolute;
                    width: 100%;
                    background: #fff;
                    border: 1px solid #e5e5e5;
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
                    transition: transform 0.3s;
                }

                .pc-back  { transform: rotate(-5deg) translateY(30px); opacity: 0.45; z-index: 1; }
                .pc-mid   { transform: rotate(-2deg) translateY(14px); opacity: 0.72; z-index: 2; }
                .pc-front { transform: rotate(0deg);                    opacity: 1;    z-index: 3; }
                .prompt-card-stack:hover .pc-back  { transform: rotate(-8deg) translateY(40px); }
                .prompt-card-stack:hover .pc-mid   { transform: rotate(-3deg) translateY(22px); }

                .pc-tag {
                    display: inline-block;
                    font-family: var(--font-mono);
                    font-size: 0.65rem;
                    letter-spacing: 0.1em;
                    background: #f0f0f0;
                    color: #555;
                    padding: 0.25rem 0.6rem;
                    border-radius: 6px;
                    width: fit-content;
                }
                .pc-text {
                    font-size: 0.92rem;
                    line-height: 1.6;
                    color: #333;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .pc-meta {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.8rem;
                    color: #888;
                    margin-top: auto;
                }

                /* ── MARQUEE STRIP ── */
                .marquee-strip {
                    width: 100%;
                    overflow: hidden;
                    border-top: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    background: #f7f7f7;
                    padding: 1.1rem 0;
                    user-select: none;
                    white-space: nowrap;
                }

                .marquee-track {
                    display: inline-flex;
                    align-items: center;
                    gap: 0;
                    animation: marquee-scroll 38s linear infinite;
                    will-change: transform;
                }

                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-quote {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0 2rem;
                }

                .mq-text {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #333;
                    font-style: italic;
                }

                .mq-author {
                    font-size: 0.78rem;
                    font-family: var(--font-mono);
                    color: #999;
                    letter-spacing: 0.04em;
                    white-space: nowrap;
                }

                .mq-sep {
                    font-size: 0.6rem;
                    color: #ccc;
                    margin-left: 1rem;
                }

                /* ── FEATURES ── */
                .features-section {
                    padding: 7rem 6rem;
                    background: #fff;
                }

                .features-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-eyebrow {
                    font-family: var(--font-mono);
                    font-size: 0.72rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #999;
                    margin-bottom: 0.6rem;
                }

                .section-title {
                    font-size: clamp(1.8rem, 3vw, 2.75rem);
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: #111;
                    margin-bottom: 0.75rem;
                }

                .section-sub {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: #666;
                    max-width: 520px;
                    margin: 0 auto;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .feature-card {
                    padding: 2rem 1.75rem;
                    border: 1px solid #e8e8e8;
                    border-radius: 16px;
                    background: #fafafa;
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
                    cursor: default;
                }
                .feature-card:hover {
                    border-color: #ccc;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.07);
                    transform: translateY(-4px);
                }

                .feature-icon {
                    font-size: 1.5rem;
                    display: block;
                }
                .feature-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #111;
                }
                .feature-desc {
                    font-size: 0.9rem;
                    line-height: 1.65;
                    color: #666;
                }

                /* ── HOW IT WORKS ── */
                .how-section {
                    padding: 7rem 6rem;
                    background: #111;
                    color: #fff;
                }
                .how-section .section-eyebrow { color: rgba(255,255,255,0.4); }
                .how-section .section-title   { color: #fff; }

                .steps-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .step-card {
                    padding: 2.5rem 2rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    background: rgba(255,255,255,0.04);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    transition: background 0.2s, border-color 0.2s;
                }
                .step-card:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.2);
                }

                .step-number {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    letter-spacing: 0.12em;
                    color: rgba(255,255,255,0.35);
                }
                .step-title {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #fff;
                }
                .step-body {
                    font-size: 0.92rem;
                    line-height: 1.65;
                    color: rgba(255,255,255,0.55);
                }

                /* ── CTA ── */
                .cta-section {
                    padding: 7rem 6rem;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cta-inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    max-width: 640px;
                    padding: 4rem 3rem;
                    border: 1px solid #e8e8e8;
                    border-radius: 24px;
                    background: #fafafa;
                    box-shadow: 0 2px 40px rgba(0,0,0,0.04);
                }

                .cta-title {
                    font-size: clamp(1.6rem, 3vw, 2.4rem);
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: #111;
                    margin-bottom: 0.5rem;
                }
                .cta-sub {
                    font-size: 1rem;
                    line-height: 1.65;
                    color: #777;
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 1024px) {
                    .hero-section    { padding: 5rem 3rem 3rem; }
                    .features-section, .how-section, .cta-section { padding: 5rem 3rem; }
                    .features-grid   { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 768px) {
                    .hero-section    { flex-direction: column; padding: 4rem 1.5rem 2rem; min-height: auto; gap: 3rem; }
                    .hero-right      { display: none; }
                    .features-section, .how-section, .cta-section { padding: 4rem 1.5rem; }
                    .features-grid   { grid-template-columns: 1fr; }
                    .steps-row       { grid-template-columns: 1fr; }
                    /* marquee-strip is naturally responsive */
                }
            `}</style>
        </motion.div>
    )
}