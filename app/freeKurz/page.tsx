"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ModernCTAButton } from "@/components/ui/modern-cta-button";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Script from "next/script";

const StrategyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CreativityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69006C12 2.69006 5.63002 6.31006 5.63002 12.0001C5.63002 17.6901 12 21.3101 12 21.3101C12 21.3101 18.37 17.6901 18.37 12.0001C18.37 6.31006 12 2.69006 12 2.69006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21.31V2.69" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConversionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 6L20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 18L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExpertiseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// New visual components for Bento Grid headers
const AnimatedChart = () => (
    <div className="flex flex-row items-end justify-center w-full h-full gap-2 p-4">
        <motion.div initial={{ height: '0%' }} whileInView={{ height: '60%' }} transition={{ duration: 0.8, ease: 'easeOut' }} className="w-1/4 bg-purple-400 rounded-t-sm" />
        <motion.div initial={{ height: '0%' }} whileInView={{ height: '80%' }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} className="w-1/4 bg-purple-500 rounded-t-sm" />
        <motion.div initial={{ height: '0%' }} whileInView={{ height: '50%' }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} className="w-1/4 bg-purple-400 rounded-t-sm" />
        <motion.div initial={{ height: '0%' }} whileInView={{ height: '70%' }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }} className="w-1/4 bg-purple-500 rounded-t-sm" />
    </div>
);

const ScrollStopVisual = () => (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 p-4 overflow-hidden">
        <motion.div
            animate={{ y: ['-50%', '50%', '-50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-full"
        >
            <div className="w-4/5 h-4 mx-auto my-2 rounded-md bg-neutral-700 opacity-50" />
            <div className="w-4/5 h-4 mx-auto my-2 rounded-md bg-neutral-700 opacity-50" />
            <div className="w-4/5 h-8 mx-auto my-2 rounded-md bg-purple-500 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400" />
            <div className="w-4/5 h-4 mx-auto my-2 rounded-md bg-neutral-700 opacity-50" />
            <div className="w-4/5 h-4 mx-auto my-2 rounded-md bg-neutral-700 opacity-50" />
        </motion.div>
    </div>
);

const ConversionFlow = () => (
    <div className="flex items-center justify-center w-full h-full gap-2 p-4 text-xs text-neutral-400">
        <span className="p-2 rounded-md bg-neutral-800">Reklama</span>
        <span>→</span>
        <span className="p-2 rounded-md bg-neutral-800">Landing Page</span>
        <span>→</span>
        <span className="p-2 rounded-md bg-purple-500 text-white">Zisk</span>
    </div>
);

const Checklist = () => (
    <div className="flex flex-col items-start justify-center w-full h-full gap-2 p-4 text-sm text-neutral-300">
        <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Analýza</span>
        </div>
        <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Stratégia</span>
        </div>
        <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Optimalizácia</span>
        </div>
    </div>
);

const courseBenefits = [
  {
    title: "Správny výber cieľov",
    description: "Ako zvoliť správny cieľ kampane – bez toho, aby si míňal zbytočne.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"><AnimatedChart /></div>,
    className: "md:col-span-2",
    icon: <StrategyIcon />,
  },
  {
    title: "Zastavenie scrollu",
    description: "Ako vytvoriť reklamu, ktorá zastaví scroll a prinúti človeka kliknúť.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"><ScrollStopVisual /></div>,
    className: "md:col-span-1",
    icon: <CreativityIcon />,
  },
  {
    title: "Prepojenie s obsahom",
    description: "Ako prepojiť reklamu s obsahom a landing stránkou tak, aby reálne zarábala.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"><ConversionFlow /></div>,
    className: "md:col-span-1",
    icon: <ConversionIcon />,
  },
  {
    title: "Overené postupy",
    description: "Odhalíme ti triky a postupy, ktoré nám trvali roky, kým sme ich dotiahli do dokonalosti.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"><Checklist /></div>,
    className: "md:col-span-2",
    icon: <ExpertiseIcon />,
  },
];

export default function FreeKurz() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [initialAnimComplete, setInitialAnimComplete] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);



  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message:', event.data); // Debug log
      
      // Detect LeadConnector form submission
      if (Array.isArray(event.data) && event.data.length >= 3) {
        // Check if it's the contact data submission format
        if (event.data[0] === 'set-sticky-contacts' && event.data[1] === '_ud' && event.data[2]) {
          try {
            const contactData = JSON.parse(event.data[2]);
            // Check if it contains our form source
            if (contactData.source === 'free kurz' || contactData.location_id === 'zDKxFqDMaHidfQnQmEqk') {
              console.log('Free kurz form submitted detected!', contactData);
              setFormSubmitted(true);
              // Redirect to welcome page instead of showing modal
              window.location.href = '/welcome';
              return;
            }
          } catch (e) {
            // Ignore JSON parsing errors
          }
        }
      }
      
      // Fallback: Handle other possible event formats
      if (
        (event.data.type === "form-submit" && event.data.formId === "uHuyLgW300lLAY5KLdhI") ||
        (event.data.event === "form-submit" && event.data.formId === "uHuyLgW300lLAY5KLdhI") ||
        event.data.formId === "uHuyLgW300lLAY5KLdhI" ||
        (typeof event.data === 'string' && event.data.includes('form-submit')) ||
        (typeof event.data === 'string' && event.data.includes('uHuyLgW300lLAY5KLdhI'))
      ) {
        console.log('Form submitted detected (fallback)!'); // Debug log
        setFormSubmitted(true);
        // Redirect to welcome page instead of showing modal
        window.location.href = '/welcome';
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);



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
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black via-black/80 via-60% to-transparent z-15"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 min-h-[18rem]">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-6xl mt-15 lg:text-7xl font-bold mb-10 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
              >
                Nauč sa robiť výkonnostné reklamy od A po Z - úplne zadarmo.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl text-slate-300 max-w-5xl mx-auto mb-12 leading-relaxed"
              >
                Tento kurz sme vytvorili pre podnikateľov, marketérov a tvorcov, ktorí chcú konečne pochopiť, ako funguje reklamný systém a ako z neho vyťažiť maximum. Ukážeme ti celý proces – od stratégie, cez prípravu videí až po nastavenie a optimalizáciu kampaní.
              </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ModernCTAButton href="#kurz-form">
                Získať prístup do kurzu
              </ModernCTAButton>
            </motion.div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 top-[55%] -translate-y-1/2 w-[55rem] h-[55rem] pointer-events-none z-10 overflow-hidden">
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

        {/* Course Benefits Section with Bento Grid */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6">
                Čo sa v kurze naučíš
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Všetko, čo potrebuješ vedieť na vytvorenie výkonnostných kampaní, ktoré reálne zarábajú.
              </p>
            </motion.div>
            
            <BentoGrid className="max-w-4xl mx-auto">
                {courseBenefits.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={item.className}
                        icon={item.icon}
                    />
                ))}
            </BentoGrid>
          </div>
        </section>

        {/* Enhanced Form Section */}
        <section id="kurz-form" className="relative py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Enhanced backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black/40 to-blue-900/10 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Enhanced corner accents */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-transparent rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-600/15 to-transparent rounded-br-3xl"></div>
                {/* Professional shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                      <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-green-500/30 backdrop-blur-sm">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Okamžitý prístup
                        </span>
                      </div>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                      {formSubmitted
                        ? "Ďakujeme!"
                        : "Získať prístup do kurzu"}
                    </h3>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                      {formSubmitted
                        ? "Všetky informácie sme ti poslali na email."
                        : "Vyplňte formulár a získajte okamžitý prístup do kompletného kurzu výkonnostných reklám"}
                    </p>
                  </div>
                  
                  {!formSubmitted ? (
                    <div className="w-full relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl"></div>
                      <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <iframe
                          src="https://api.leadconnectorhq.com/widget/form/uHuyLgW300lLAY5KLdhI"
                          style={{
                            width: "100%",
                            height: "min(820px, 85vh)",
                            border: "none",
                            borderRadius: "12px",
                            backgroundColor: "transparent",
                          }}
                          id="inline-uHuyLgW300lLAY5KLdhI"
                          data-layout='{"id":"INLINE"}'
                          data-trigger-type="alwaysShow"
                          data-trigger-value=""
                          data-activation-type="alwaysActivated"
                          data-activation-value=""
                          data-deactivation-type="neverDeactivate"
                          data-deactivation-value=""
                          data-form-name="Form 0"
                          data-height="820"
                          data-layout-iframe-id="inline-uHuyLgW300lLAY5KLdhI"
                          data-form-id="uHuyLgW300lLAY5KLdhI"
                          title="Form 0"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-2xl text-white py-12">
                      <p>Prístup do kurzu nájdeš vo svojej emailovej schránke.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
                Ešte váhaš?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Tento kurz je kompletne zadarmo a obsahuje všetko, čo potrebuješ vedieť na vytvorenie výkonnostných kampaní.
              </p>
              <ModernCTAButton href="#kurz-form">
                Získať prístup teraz
              </ModernCTAButton>
              <p className="text-sm text-gray-400 mt-4">
                Bez záväzkov • Okamžitý prístup • 100% zadarmo
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      

      <BackgroundBeams className="z-0" />
    </div>
  );
}