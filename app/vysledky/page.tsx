"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ModernCTAButton } from "@/components/ui/modern-cta-button";
import Image from "next/image";
import { ResultsGallery } from "@/components/ui/results-gallery";
import LogoCarousel from "@/components/ui/logo-carousel"; // Import the fixed LogoCarousel

const performanceImages = [
    "/HubHigh fotky/9.png",
    "/HubHigh fotky/18.png",
    "/HubHigh fotky/19.png",
    "/HubHigh fotky/20.png",
    "/HubHigh fotky/21.png",
    "/HubHigh fotky/22.png",
    "/HubHigh fotky/23.png",
    "/HubHigh fotky/24.png",
];

const organicImages = [
    "/HubHigh fotky/1.JPG",
    "/HubHigh fotky/2.JPG",
    "/HubHigh fotky/3.JPG",
    "/HubHigh fotky/4.JPG",
    "/HubHigh fotky/5.JPG",
    "/HubHigh fotky/6.JPG",
    "/HubHigh fotky/7.JPG",
    "/HubHigh fotky/8.JPG",
    "/HubHigh fotky/13.jpg",

];

export default function Vysledky() {
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-28 pb-32">
          {/* Black gradient from top covering text and half circle */}
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black via-black/80 via-60% to-transparent z-[15]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-6xl mt-15 lg:text-7xl font-bold mb-10"
              >
                Nechajme výsledky{" "}
                <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                  nahradiť slová
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto mb-24 leading-relaxed"
              >
                Na tejto stránke nenájdete sľuby, len konkrétne čísla, ktoré hovoria za nás.
                Ukazujeme, ako vyzerá rast, keď sa spojí stratégia, kvalitný obsah a dôvera medzi nami a klientom.
              </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-24"
            >
              <ModernCTAButton href="/kontakt?modal=true">
                Začnime s konzultáciou
              </ModernCTAButton>
            </motion.div>
          </div>
          
          {/* Circle framing the CTA */}
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
        </section>

        {/* Client Logos Section - NOW FIXED */}
        <LogoCarousel />

        {/* Results Sections */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <ResultsGallery 
              title="Organický rast"
              description="Výsledky z organických aktivít na sociálnych sieťach"
              images={organicImages}
            />
            <ResultsGallery 
              title="Reklamy"
              description="Konkrétne výsledky z platených kampaní na Meta platformách"
              images={performanceImages}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-12"
            >
              <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
                Chcete podobné výsledky?
              </h3>
              <p className="text-xl text-slate-300 mb-8">
                Začnime spolu a ukážme, čo dokážeme pre váš biznis
              </p>
              <ModernCTAButton href="/kontakt?modal=true">
                Začnime s konzultáciou
              </ModernCTAButton>
            </motion.div>
          </div>
        </section>
      </main>

      <BackgroundBeams className="z-0" />
    </div>
  );
}