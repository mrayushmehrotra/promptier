"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    IconBrandGithub,
    IconBrandTwitter,
    IconBrandDiscord,
    IconHeartFilled,
    IconPhotoSearch
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer = () => {
    return (
        <footer className="sticky h-[50vh] bottom-6 left-0 right-0 z-[-1] px-4 ">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
                className="flex items-center relative justify-center h-fit"
            >
                <span className="font-[Transcity] absolute top-[10vh] font-bold text-[180px]  text-white ">
                    Promptier
                </span>
                <ul className="flex gap-x-8 absolute top-[40vh]">
                    <li>about us</li>
                    <li>contact us</li>
                    <li>privacy policy</li>
                    <li>terms of service</li>
                </ul>

            </motion.div>
        </footer>
    );
};

export default Footer;
