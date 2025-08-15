"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WelcomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams className="z-0" />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-28 pb-32">
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black via-black/80 via-60% to-transparent z-15"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            {/* Welcome Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            {/* Welcome Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
            >
              Váš prístup do kurzu je pripravený!
            </motion.h1>

            {/* Welcome Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Ďakujeme, že ste sa prihlásili – link na vstup do kurzu sme vám poslali na e-mail (pre istotu si skontrolujte aj priečinok Spam/Propagácie).
            </motion.p>

            {/* Instructions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Nezabudnite:</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Prístupový link nájdete vo vašom e-maile a môžete ho použiť okamžite.</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Ak e-mail neprišiel do pár minút, skontrolujte Spam alebo napíšte na <a href="mailto:info@hubhigh.com" className="text-purple-400 hover:text-purple-300 underline">info@hubhigh.com</a>.</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Kurz si môžete pozrieť kedykoľvek a z akéhokoľvek zariadenia.</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Odporúčame si uložiť link, aby ste ho mali vždy poruke.</span>
                </div>
              </div>
            </motion.div>

            {/* Final Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-12 max-w-2xl mx-auto"
            >
              <p className="text-gray-300 text-lg">
                Tešíme sa, že ste súčasťou komunity a veríme, že vám kurz prinesie hodnotné tipy a výsledky.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/">
                <button className="px-8 cursor-pointer py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20">
                  Späť na hlavnú stránku
                </button>
              </Link>
            
            </motion.div>
          </div>
        </section>


      </main>
    </div>
  );
}
