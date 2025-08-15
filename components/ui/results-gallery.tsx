"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";

const MotionImage = motion(Image);

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => (
  <motion.div
    layoutId={`card-${src}`}
    onClick={onClick}
    className="relative rounded-xl overflow-hidden cursor-pointer group mb-4 break-inside-avoid"
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 350, damping: 25 }}
  >
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 transition-opacity duration-300 group-hover:opacity-50" />
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
          <ImageCard key={index} src={src} alt={`${title} - Result ${index + 1}`} onClick={() => setSelectedImage(src)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Animated image container */}
            <motion.div
              layoutId={`card-${selectedImage}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-auto h-auto max-w-[95vw] max-h-[90vh] shadow-2xl"
            >
              <motion.img
                src={selectedImage}
                alt="Enlarged result"
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
            
            {/* Close button */}
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white/80 bg-black/40 rounded-full p-2 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white z-[51]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, ease: "easeOut" } }}
              exit={{ opacity: 0, scale: 0.8, transition: { ease: "easeIn" } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconX className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
