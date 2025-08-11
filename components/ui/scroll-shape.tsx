"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ScrollShape = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight * 0.3;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center mt-8 mb-8">
        <div className="relative">
          <svg width="120" height="60" viewBox="0 0 120 60">
            <path
              d="M10 30 Q30 10, 60 30 Q90 50, 110 30"
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    );
  }

  const strokeDashoffset = 100 - (scrollProgress * 100);

  return (
    <div className="flex justify-center mt-8 mb-8">
      <motion.div className="relative">
        <svg width="120" height="60" viewBox="0 0 120 60">
          {/* Background shape */}
          <path
            d="M10 30 Q30 10, 60 30 Q90 50, 110 30"
            stroke="rgba(147, 51, 234, 0.3)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Animated fill shape */}
          <path
            d="M10 30 Q30 10, 60 30 Q90 50, 110 30"
            stroke="rgb(147, 51, 234)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="drop-shadow-lg transition-all duration-100 ease-out"
          />
          
          {/* Glow effect */}
          <path
            d="M10 30 Q30 10, 60 30 Q90 50, 110 30"
            stroke="rgb(147, 51, 234)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            opacity="0.3"
            className="blur-sm transition-all duration-100 ease-out"
          />
        </svg>
        
        {/* Pulsing dots */}
        <motion.div
          className="absolute top-1/2 left-2 w-2 h-2 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-2 w-2 h-2 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};