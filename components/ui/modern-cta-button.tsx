"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ModernCTAButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const ModernCTAButton = ({ 
  children, 
  className, 
  onClick, 
  href 
}: ModernCTAButtonProps) => {
  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          onClick={onClick}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
          style={{ 
            touchAction: 'manipulation',
            boxShadow: "0 10px 25px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
          className={cn(
            "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white cursor-pointer",
            "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
            "rounded-2xl shadow-lg shadow-purple-500/25",
            "border border-purple-400/20",
            "transition-all duration-300 ease-out",
            "hover:shadow-xl hover:shadow-purple-500/30",
            "hover:border-purple-300/30",
            "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black",
            "active:shadow-md",
            "overflow-hidden",
            className
          )}
        >
          {/* Inner glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <span className="relative z-10 flex items-center gap-3">
            {children}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </span>
          
          {/* Subtle shine effect */}
          <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent h-px" />
        </motion.div>
      </Link>
    );
  }
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white cursor-pointer",
        "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
        "rounded-2xl shadow-lg shadow-purple-500/25",
        "border border-purple-400/20",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:shadow-purple-500/30",
        "hover:border-purple-300/30",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black",
        "active:shadow-md",
        "overflow-hidden",
        className
      )}
      style={{
        boxShadow: "0 10px 25px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      }}
    >
      {/* Inner glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent h-px" />
    </motion.button>
  );
};