"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  let animationFrameId: number | null = null;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentPosition = 0;
    const speed = 0.5; // Slower speed for smoother animation
    
    const animate = () => {
      if (!container) return;
      
      // Get fresh dimensions on each frame to handle responsive changes
      const firstSet = container.children[0] as HTMLElement;
      if (!firstSet) return;
      
      // Calculate the width of one complete set (first 10 logos)
      const logoWidth = firstSet.offsetWidth;
      const gap = 16; // gap-4 = 16px on mobile, gap-8 = 32px on desktop
      const actualGap = window.innerWidth >= 640 ? 32 : 16;
      const singleSetWidth = (logoWidth + actualGap) * 10; // 10 logos per set
      
      currentPosition -= speed;
      
      // Reset position when one complete set has scrolled
      if (currentPosition <= -singleSetWidth) {
        currentPosition = 0;
      }
      
      container.style.transform = `translateX(${currentPosition}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation immediately
    setIsAnimating(true);
    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      setIsAnimating(false);
    };
  }, []);

  return (
    <section className="relative py-16 bg-black/[0.96] -mt-1 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-semibold text-white mb-4"
          >
            Naši klienti
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Firmy, ktorým sme pomohli dosiahnuť reálne výsledky
          </motion.p>
        </div>
        
        {/* LOGO CAROUSEL CONTAINER */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={containerRef}
            className="flex gap-4 sm:gap-8 logo-carousel-container"
            style={{ 
              animation: 'none',
              transform: 'translateX(0)',
              transition: 'none'
            }}
          >
            {/* First set of images */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <motion.div
                key={`first-${num}`}
                className="flex-shrink-0 w-24 h-24 sm:w-40 sm:h-40 group relative"
                whileHover={{ scale: 1.05, rotateY: 15 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl transition-all duration-300 w-full h-full">
                  <img 
                    src={`/klienti/${num}.png`}
                    alt={`Klient ${num}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <motion.div
                key={`second-${num}`}
                className="flex-shrink-0 w-24 h-24 sm:w-40 sm:h-40 group relative"
                whileHover={{ scale: 1.05, rotateY: 15 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl transition-all duration-300 w-full h-full">
                  <img 
                    src={`/klienti/${num}.png`}
                    alt={`Klient ${num}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
            

          </div>
        </div>
      </div>
    </section>
  );
};
