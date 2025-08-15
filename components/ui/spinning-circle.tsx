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
    <div className="absolute left-1/2 -translate-x-1/2 top-[50%] sm:top-[55%] -translate-y-1/2 w-[55rem] h-[55rem] pointer-events-none z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: mounted ? 1 : 0,
          scale: 1,
          rotate: initialAnimComplete ? 180 + scrollRotation : 180
        }}
        transition={{ 
          duration: initialAnimComplete ? 0 : 1.2, 
          ease: initialAnimComplete ? "linear" : "easeOut",
          delay: initialAnimComplete ? 0 : 0.8
        }}
        onAnimationComplete={() => setInitialAnimComplete(true)}
        className="w-full h-full relative"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 80px rgba(147, 51, 234, 0.4))',
          willChange: 'transform, opacity'
        }}
      >
        <Image
          src="/circle.png"
          alt="Circle"
          width={880}
          height={880}
          className="w-full h-full object-contain"
          quality={100}
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)'
          }}
        />
      </motion.div>
    </div>
  );
};