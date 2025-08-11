"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MapStep {
  number: string;
  title: string;
  description: string;
  points: string[];
}

interface PirateMapProps {
  steps: MapStep[];
  className?: string;
}

export const PirateMap = ({ steps, className }: PirateMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to path drawing
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, pathLength]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = pathProgress.on("change", (latest) => {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = `${pathLength - latest}`;
      }
    });
    return unsubscribe;
  }, [pathProgress, pathLength]);

  // Create the curved S-shaped path following the sketch
  const createPiratePath = () => {
    // Card positions matching the yellow sketch layout
    const card1X = 200;   // Top-left
    const card1Y = 150;
    const card2X = 600;   // Top-right  
    const card2Y = 200;
    const card3X = 150;   // Bottom-left
    const card3Y = 500;
    
    // Create smooth S-curve connecting all three cards
    let pathData = `M ${card1X} ${card1Y}`;
    
    // First curve: top-left to top-right with elegant S-shape
    pathData += ` C ${card1X + 150} ${card1Y - 50}, ${card2X - 150} ${card2Y - 80}, ${card2X} ${card2Y}`;
    
    // Second curve: top-right to bottom-left with wide arc
    pathData += ` C ${card2X + 100} ${card2Y + 100}, ${card3X + 300} ${card3Y - 150}, ${card3X} ${card3Y}`;
    
    return pathData;
  };

  // Card highlight based on path progress
  const getCardScale = (cardIndex: number) => {
    return useTransform(scrollYProgress, 
      [cardIndex * 0.33, (cardIndex + 1) * 0.33], 
      [1, 1.05]
    );
  };

  return (
    <section className={cn("relative py-20 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-semibold text-white mb-6"
          >
            Ako Fungujeme
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Sme ako doktor pre vašu značku.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed"
          >
            Skôr než začneme tvoriť, analyzujeme, čo už máte – vaše silné stránky, priestor na zlepšenie, cieľe aj aktuálne možnosti.
          </motion.p>
        </div>

        {/* Pirate Map Container */}
        <div ref={containerRef} className="relative min-h-[600px] w-full">
          {/* SVG Path */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 800 650"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pirateGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
              </linearGradient>
              <filter id="roughPaper">
                <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
              </filter>
            </defs>
            
            {/* Hand-drawn pirate path */}
            <path
              ref={pathRef}
              d={createPiratePath()}
              stroke="url(#pirateGold)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="12 8 4 8"
              filter="url(#roughPaper)"
              className="drop-shadow-sm"
            />
          </svg>

          {/* Treasure Cards */}
          {steps.map((step, index) => {
            const positions = [
              { left: '200px', top: '100px', rotate: '-2deg' },  // Top-left
              { left: '550px', top: '150px', rotate: '3deg' },   // Top-right
              { left: '100px', top: '400px', rotate: '-1deg' }   // Bottom-left
            ];

            const position = positions[index];
            const cardScale = getCardScale(index);

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: position.left,
                  top: position.top,
                  transform: `rotate(${position.rotate}) translateX(-50%)`,
                  scale: cardScale
                }}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: parseFloat(position.rotate.replace('deg', ''))
                }}
                transition={{ 
                  delay: 0.2 + index * 0.3, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                {/* Treasure Map Pin */}
                <div className="absolute -top-4 -right-2 w-6 h-6 bg-amber-600 rounded-full shadow-lg z-20 border-2 border-amber-800">
                  <div className="w-2 h-2 bg-amber-800 rounded-full mx-auto mt-1"></div>
                </div>

                {/* Pirate Card */}
                <div className="relative w-64 md:w-72">
                  {/* Parchment Background */}
                  <div 
                    className="relative p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl border-2 border-amber-200"
                    style={{
                      borderRadius: `${Math.random() * 5 + 10}px ${Math.random() * 5 + 15}px ${Math.random() * 5 + 12}px ${Math.random() * 5 + 8}px`,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Aged paper texture overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-amber-200/30 rounded-lg mix-blend-multiply"></div>
                    
                    {/* Step Number - Pirate Style */}
                    <div className="relative z-10 flex items-center mb-4">
                      <div className="w-8 h-8 bg-amber-800 text-amber-100 rounded-full flex items-center justify-center font-bold text-lg mr-3 shadow-lg">
                        {step.number}
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-amber-600 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-amber-900 mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-amber-800 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Points */}
                      <div className="space-y-2">
                        <p className="text-amber-700 font-semibold text-xs mb-2">
                          Na čo sa zameriame:
                        </p>
                        {step.points.slice(0, 3).map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                            <p className="text-xs text-amber-800 leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vintage corners */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-amber-400 rounded-tl-lg"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-amber-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-amber-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-amber-400 rounded-br-lg"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-full shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105"
          >
            Začnime s konzultáciou
          </motion.button>
        </div>
      </div>
    </section>
  );
};