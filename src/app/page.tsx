"use client";
import { motion } from "framer-motion";
import ImageGrid from "@/components/motion/ImageGrid";
import RightChevron from "@/components/ui/right-chevron";
import { AuroraBackground } from "@/components/ui/aurora-background";
import FlowHero from "@/components/motion/HeroSection";
import DomeGallery from "@/components/DomeGallery";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import AppleCardsCarouselDemo from "@/components/apple-cards-carousel-demo";

export default function Home() {
  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0 z-0">
          <ImageGrid images={[]} searchQuery="" />
        </div>

        <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              Promptier
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12"
          >
            Store, organize, and rediscover your AI-generated images
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex gap-4"
          >
            <button className=" flex px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105">
              Get Started <RightChevron />
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all hover:scale-105 backdrop-blur-sm">
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
              >
                <div className="w-1.5 h-3 bg-white/60 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* for blur */}
      <div className="">
        <FlowHero />
      </div>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 h-[800px] w-full"
        >
          <AppleCardsCarouselDemo />
        </motion.div>
      </AuroraBackground>
    </>
  );
}
