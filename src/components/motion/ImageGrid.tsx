"use client";

import { motion, Variants } from "framer-motion";
import { staggerGrid, fadeIn } from "@/lib/animations";
import { ImageCard } from "../ImageCard";
import type { AIImage } from "@/lib/types";
import Image from "next/image";

const ASSETS = [
  { src: "/assets/landscape.webp", type: "image" as const },
  { src: "/assets/square.webp", type: "image" as const },
  { src: "/assets/portrait.mp4", type: "video" as const },
  { src: "/assets/square_1.mp4", type: "video" as const },
  { src: "/assets/portrait_1.mp4", type: "video" as const },
  { src: "/assets/square_2.mp4", type: "video" as const },
  { src: "/assets/portrait_2.mp4", type: "video" as const },
  { src: "/assets/square.mp4", type: "video" as const },
];

const extendedAssets = [...ASSETS, ...ASSETS, ...ASSETS];

const itemFadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function MediaItem({ asset }: { asset: (typeof ASSETS)[number] }) {
  return (
    <motion.div variants={itemFadeIn} className="mb-4 break-inside-avoid">
      {asset.type === "image" ? (
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={asset.src}
            alt=""
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      ) : (
        <video
          src={asset.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-xl"
        />
      )}
    </motion.div>
  );
}

interface ImageGridProps {
  images: AIImage[];
  searchQuery: string;
}

export function ImageGrid({ images, searchQuery }: ImageGridProps) {
  const filteredImages = images.filter((img) =>
    img.prompt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (filteredImages.length === 0) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="h-[80vh] w-full overflow-auto"
      >
        <motion.div
          variants={staggerGrid}
          initial="initial"
          animate="animate"
          className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
        >
          {extendedAssets.map((asset, index) => (
            <MediaItem key={`${asset.src}-${index}`} asset={asset} />
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerGrid}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {filteredImages.map((image, index) => (
        <motion.div
          key={image.id}
          variants={fadeIn}
          custom={index}
          className="flex"
        >
          <ImageCard image={image} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ImageGrid;
