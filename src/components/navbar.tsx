'use client'
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    const word = "Promptier";

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <nav className="bg-gray-200 border border-b-black flex items-center justify-between p-8">
            <div className="flex relative flex-col">
                <div className="bg-black absolute top-0 left-0 w-[100px] h-[20px]" >

                </div>
                <motion.h1
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="flex z-2 uppercase text-8xl font-bold tracking-tighter"
                >
                    {word.split("").map((letter, index) => (
                        <motion.span key={index} variants={child}>
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>
                <sup className="text-2xl font-semibold -mt-2 ml-1">crafting images</sup>
            </div>

            <div className="flex items-center gap-8">
                <Link
                    href="/signup"
                    className="px-6 py-2  text-black rounded-full font-medium transition-colors"
                >
                    Let&apos;s go
                </Link>
            </div>
        </nav>
    );
}