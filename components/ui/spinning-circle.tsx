"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const SpinningCircle = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [initialAnimComplete, setInitialAnimComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (mounted) {
        setScrollY(window.scrollY);
      }
    };

    // Add slight delay to prevent initial stutters
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);

  const scrollRotation = scrollY * 0.110810;

  return (
    <div className="absolute left-1/2 top-[38rem] -translate-x-1/2 w-full max-w-[min(72rem,100vw)] h-auto aspect-square pointer-events-none z-20 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black via-black/90 to-transparent z-50"></div>
      <motion.div
        initial={{ x: -100, y: 150, opacity: 0, rotate: -90, scale: 0.9 }}
        animate={{ 
          x: 0,
          y: 0, 
          opacity: mounted ? 1 : 0,
          scale: 1,
          rotate: initialAnimComplete ? scrollRotation : 0
        }}
        transition={{ 
          duration: initialAnimComplete ? 0 : 1.4, 
          ease: initialAnimComplete ? "linear" : [0.16, 1, 0.3, 1],
          delay: initialAnimComplete ? 0 : 1.2,
          type: "spring",
          damping: 25,
          stiffness: 120
        }}
        onAnimationComplete={() => setInitialAnimComplete(true)}
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 80px rgba(147, 51, 234, 0.4))',
          willChange: 'transform, opacity'
        }}
      >
        <Image
          src="/circle.png"
          alt="Circle"
          width={1152}
          height={1152}
          className="w-full h-full object-contain"
          quality={100}
          priority
          unoptimized
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0) 100%)'
          }}
        />
      </motion.div>
    </div>
  );
};