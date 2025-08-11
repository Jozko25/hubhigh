"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedCircle = ({ className, reversed = false }: { className?: string; reversed?: boolean }) => {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", className)}>
      <motion.div
        className="w-96 h-96 rounded-full border-2 border-purple-500/30"
        animate={{
          rotate: reversed ? -360 : 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute top-4 left-1/2 w-3 h-3 bg-purple-500 rounded-full -translate-x-1/2"
          animate={{
            rotate: reversed ? 360 : -360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      
      <motion.div
        className="absolute w-80 h-80 rounded-full border border-purple-400/20"
        animate={{
          rotate: reversed ? 360 : -360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute top-2 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2"
          animate={{
            rotate: reversed ? -360 : 360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute w-64 h-64 rounded-full border border-purple-300/15"
        animate={{
          rotate: reversed ? -360 : 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full -translate-x-1/2"
          animate={{
            rotate: reversed ? 360 : -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};