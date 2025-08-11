"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => (
  <motion.div
    layoutId={`card-${src}`}
    onClick={onClick}
    className="relative rounded-xl overflow-hidden cursor-pointer group"
    whileHover={{ scale: 1.03, y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
  </motion.div>
);

interface ResultsGalleryProps {
  title: string;
  description: string;
  images: string[];
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({ title, description, images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-8">{description}</p>
      
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="mb-4 break-inside-avoid">
            <ImageCard src={src} alt={`${title} - Result ${index + 1}`} onClick={() => setSelectedImage(src)} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            layoutId={`card-${selectedImage}`}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
              <Image
                src={selectedImage}
                alt="Enlarged result"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
