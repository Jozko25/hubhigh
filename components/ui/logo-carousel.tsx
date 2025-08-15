"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let animationId: number | null = null;

  useEffect(() => {
    const fixLogoAnimation = () => {
      const logoContainer = containerRef.current;
      if (logoContainer && window.innerWidth <= 768) {
        // Remove CSS animation and use JavaScript-based scrolling
        logoContainer.style.animation = 'none';
        logoContainer.style.transform = 'translateX(0)';
        
        // Start JavaScript-based infinite scroll
        animationId = startInfiniteScroll(logoContainer);
      }
    };

    // JavaScript-based infinite scroll for mobile
    const startInfiniteScroll = (container: HTMLElement) => {
      let scrollPosition = 0;
      const scrollSpeed = 0.8; // pixels per frame - slightly slower for smoothness
      const singleSetWidth = container.scrollWidth / 3; // One-third because we have three sets
      
      const scroll = () => {
        scrollPosition -= scrollSpeed;
        
        // Reset position when we've scrolled one set width
        if (scrollPosition <= -singleSetWidth) {
          scrollPosition = 0;
        }
        
        container.style.transform = `translateX(${scrollPosition}px)`;
        requestAnimationFrame(scroll);
      };
      
      const animationId = requestAnimationFrame(scroll);
      return animationId;
    };

    // Fix on mount and resize
    fixLogoAnimation();
    window.addEventListener('resize', fixLogoAnimation);
    
    return () => {
      window.removeEventListener('resize', fixLogoAnimation);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
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
            className="flex gap-4 sm:gap-8 animate-scroll transform-gpu will-change-transform"
            id="logo-scroll-container"
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
            
            {/* Third set for extra smooth looping */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <motion.div
                key={`third-${num}`}
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
