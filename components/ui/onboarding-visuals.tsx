"use client";
import React from "react";
import { motion } from "framer-motion";

const VisualContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full p-4 md:p-6 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-sm rounded-2xl border border-neutral-800/80 flex items-center justify-center overflow-hidden">
    <div className="w-full h-full flex items-center justify-center">
        {children}
    </div>
  </div>
);

export const Step1Visual = () => (
    <VisualContainer>
        <motion.div 
            className="w-full h-full max-w-[280px] max-h-[400px] bg-neutral-800/50 rounded-lg p-5 space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3">
                <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-2/3 h-5 bg-neutral-700 rounded-sm"></div>
            </div>
            <div className="space-y-3 pt-6">
                {[...Array(3)].map((_, i) => (
                     <motion.div 
                        key={i}
                        className="h-4 bg-neutral-700 rounded-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        style={{ width: `${100 - i * 10}%`}}
                    />
                ))}
            </div>
        </motion.div>
    </VisualContainer>
);

export const Step2Visual = () => (
    <VisualContainer>
        <motion.div 
            className="w-full max-w-xs h-48 bg-neutral-800/50 rounded-lg p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center gap-1.5 p-2">
                <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
            </div>
            <div className="bg-neutral-900/70 h-full rounded-b-md flex items-center justify-center p-4">
                 <motion.div 
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <svg width="100%" height="100%" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8A2BE2" />
                                <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                        </defs>
                        <motion.circle 
                            cx="120" 
                            cy="50" 
                            r="35" 
                            stroke="url(#globe-gradient)" 
                            strokeWidth="1.5" 
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                        />
                         <motion.path
                            d="M 40 65 Q 120 10, 200 65"
                            stroke="#4A5568"
                            strokeWidth="1" 
                            fill="none"
                            strokeDasharray="3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        />
                    </svg>
                 </motion.div>
            </div>
        </motion.div>
    </VisualContainer>
);

export const Step3Visual = () => (
    <VisualContainer>
        <div className="w-full h-full flex justify-around items-end gap-2 md:gap-4 p-4">
            {[60, 80, 50, 90, 70].map((height, i) => (
                <motion.div
                    key={i}
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-md"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "circOut"
                    }}
                />
            ))}
        </div>
    </VisualContainer>
);


export const Step4Visual = () => (
    <VisualContainer>
        <div className="w-full h-full flex items-center justify-center">
             <svg width="90%" height="90%" viewBox="0 0 256 192" preserveAspectRatio="xMidYMid meet">
                <motion.path
                    d="M 20 172 C 80 20, 180 182, 236 40"
                    fill="none"
                    stroke="#4A5568"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                 <motion.circle
                    r={8}
                    fill="#3B82F6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                >
                    <animateMotion dur="2s" begin="0s" fill="freeze" path="M 20 172 C 80 20, 180 182, 236 40" />
                </motion.circle>
                <motion.g initial={{scale:0, opacity: 0}} animate={{scale:1, opacity: 1}} transition={{delay: 1.8, duration: 0.5}}>
                    <circle cx="236" cy="40" r="16" fill="#3B82F6" opacity="0.3"/>
                    <circle cx="236" cy="40" r="8" fill="#3B82F6" />
                </motion.g>
            </svg>
        </div>
    </VisualContainer>
);

export const Step5Visual = () => (
  <VisualContainer>
    <div className="relative w-full h-full max-w-[224px] max-h-[224px] aspect-square">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: `rgba(147, 51, 234, ${1 - i * 0.18})`,
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: 1 + i*0.1,
            opacity: 1,
            rotate: i % 2 === 0 ? 90 : -90,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            ease: "circOut",
          }}
        />
      ))}
      <motion.div
        className="absolute inset-[25%] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: "backOut"}}
      >
        <div className="w-4 h-4 bg-white/80 rounded-full" />
      </motion.div>
    </div>
  </VisualContainer>
);
