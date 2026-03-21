'use client'
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"
import Image from "next/image"

// Import Swiper styles
import "swiper/css";

export default function HomeContent() {
    return (
        <motion.div>
            <Navbar />
            <section className="flex items-center justify-around h-screen">
                <div className="max-w-md">
                    <h1 className="uppercase font-extrabold text-5xl leading-tight">
                        WHERE Good prompts meet good people&apos;s
                    </h1>
                </div>
                <div className="w-[400px]">
                    <Swiper
                        modules={[Mousewheel]}
                        mousewheel={true}
                        spaceBetween={20}
                        slidesPerView={1}
                        className="mySwiper"
                    >
                        {['hero_image1.jpg', 'hero_image2.jpg', 'hero_image3.jpg', 'hero_image5.webp'].map((item, i) => (
                            <SwiperSlide key={i} className="flex items-center justify-center">
                                <div className="relative overflow-hidden rounded-2xl" style={{ height: `${30 + i * 5}vh`, width: '100%' }}>
                                    <Image
                                        alt={item}
                                        src={`/${item}`}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </motion.div>
    )
}