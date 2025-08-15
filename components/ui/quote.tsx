"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuoteProps {
  text: string;
  className?: string;
  containerClassName?: string;
}

export const Quote = ({ text, className, containerClassName }: QuoteProps) => {
  return (
    <div className={cn("relative py-12 bg-black/[0.96]", containerClassName)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.blockquote 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={cn(
              "text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white italic max-w-4xl mx-auto leading-relaxed relative z-20 p-4 sm:p-6 lg:p-8",
              className
            )}
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              willChange: 'transform'
            }}
          >
            <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-gradient-to-b from-purple-400/60 via-purple-300/40 to-purple-500/30 bg-clip-text absolute -top-6 -left-2 sm:-top-8 sm:-left-4 lg:-top-10 lg:-left-6 font-serif select-none pointer-events-none drop-shadow-lg">"</span>
            {text}
            <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-gradient-to-b from-purple-400/60 via-purple-300/40 to-purple-500/30 bg-clip-text absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 lg:-bottom-10 lg:-right-6 font-serif select-none pointer-events-none drop-shadow-lg">"</span>
          </motion.blockquote>
        </div>
      </div>
    </div>
  );
};
