"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ModernCTAButton } from "@/components/ui/modern-cta-button";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronRight, MessageCircle, Heart } from "lucide-react";

// --- Service-specific Visual Components v4 (Final) ---
const PerformanceAdsVisual = () => {
    const kpis = [
        { label: "ROAS", value: "4.7x", change: "+15%" },
        { label: "Konverzie", value: "1,283", change: "+22%" },
        { label: "CTR", value: "2.1%", change: "+5%" }
    ];
    return (
        <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm rounded-2xl border border-neutral-700/50 shadow-[0_0_20px_rgba(147,51,234,0.15)]">
            <h4 className="text-base sm:text-lg font-bold text-white">Dashboard výkonnosti</h4>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {kpis.map((kpi, i) => (
                    <motion.div 
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-neutral-800/50 p-3 rounded-lg"
                    >
                        <p className="text-xs text-neutral-400">{kpi.label}</p>
                        <p className="text-xl sm:text-2xl font-bold text-white mt-1">{kpi.value}</p>
                        <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                            <ArrowUpRight size={14} /> {kpi.change}
                        </p>
                    </motion.div>
                ))}
            </div>
            <div className="w-full h-24 mt-4">
                <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <motion.path
                        d="M 0 80 Q 50 20, 100 60 T 200 70 T 300 40"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8A2BE2" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

const ContentCreationVisual = () => (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm rounded-2xl border border-neutral-700/50 shadow-[0_0_20px_rgba(147,51,234,0.15)] flex flex-col">
        <h4 className="text-base sm:text-lg font-bold text-white">Video Editor</h4>
        <div className="w-full flex-grow bg-neutral-950/70 rounded-lg mt-4 p-2 sm:p-4 space-y-3 relative overflow-hidden">
            {[
                { type: "Video", color: "bg-purple-500/50", width: "w-11/12" },
                { type: "Audio", color: "bg-blue-500/50", width: "w-10/12" },
                { type: "Titles", color: "bg-green-500/50", width: "w-8/12" },
                { type: "Color", color: "bg-yellow-500/50", width: "w-full" }
            ].map((track, i) => (
                <div key={track.type} className="flex items-center gap-2">
                    <div className="w-12 text-right text-xs text-neutral-500 flex-shrink-0">{track.type}</div>
                    <motion.div
                        className={`flex-1 h-10 ${track.color} rounded-md`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className={`${track.width} h-full bg-white/10 rounded-md`}></div>
                    </motion.div>
                </div>
            ))}
        </div>
    </div>
);

const SocialMediaVisual = () => (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm rounded-2xl border border-neutral-700/50 shadow-[0_0_20px_rgba(147,51,234,0.15)]">
        <h4 className="text-base sm:text-lg font-bold text-white mb-4">Správa Sociálnych Sietí</h4>
        <div className="space-y-4">
            {[
                { name: "HubHigh", text: "Prinášame výsledky, nie len pekné obrázky. 🚀", likes: "1.2k", comments: "89" },
                { name: "Klient A", text: "Neuveriteľný rast vďaka kampaniam!", likes: "972", comments: "45" },
            ].map((post, i) => (
                <motion.div 
                    key={i}
                    className="bg-neutral-800/70 p-3 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex-shrink-0"></div>
                        <p className="text-sm font-bold text-white">{post.name}</p>
                    </div>
                    <p className="text-sm text-neutral-300 my-2">{post.text}</p>
                    <div className="flex items-center gap-4 text-neutral-400">
                        <div className="flex items-center gap-1.5">
                            <Heart size={14} />
                            <span className="text-xs">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MessageCircle size={14} />
                            <span className="text-xs">{post.comments}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const WebDevVisual = () => {
    const lines = [
        "<section className='konverzia'>",
        "  <h1>Tvoríme weby, ktoré predávajú</h1>",
        "  <ModernCTAButton>Získať ponuku</ModernCTAButton>",
        "</section>"
    ];
    return (
        <div className="w-full h-full p-4 sm:p-6 bg-[#0D1117] rounded-2xl border border-neutral-700/50 shadow-[0_0_20px_rgba(147,51,234,0.15)] font-mono text-sm text-neutral-300">
             <div className="flex gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FC5753]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FDBC2D]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                >
                    <span className="text-neutral-600 mr-4 select-none">{i+1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line.replace(/<(\/?)([^>]+)>/g, '&lt;$1<span class="text-purple-400">$2</span>&gt;').replace(/className='([^']+)'/g, 'className=<span class="text-blue-400">\'$1\'</span>') }} />
                </motion.div>
            ))}
        </div>
    );
};

const CRMVisual = () => (
    <div className="w-full h-full max-w-md mx-auto p-4 sm:p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm rounded-2xl border border-neutral-700/50 shadow-[0_0_20px_rgba(147,51,234,0.15)] flex flex-col items-center text-center">
        <h4 className="text-lg font-bold text-white">Lead Management Flow</h4>
        <p className="text-sm text-neutral-400 mt-1 mb-6">Od prvého kontaktu po verného zákazníka.</p>
        <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="flex items-center gap-4 p-3 bg-neutral-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400"><Check size={16}/></div>
                <p>Zber Leadov</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="h-6 w-px bg-purple-500 mx-auto"/>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex items-center gap-4 p-3 bg-neutral-800 rounded-lg">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400"><ChevronRight size={16}/></div>
                <p>Automatizovaný Follow-up</p>
            </motion.div>
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="h-6 w-px bg-green-500 mx-auto"/>
             <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="flex items-center gap-4 p-3 bg-neutral-800 rounded-lg">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400"><Check size={16}/></div>
                <p>Konverzia na Zákazníka</p>
            </motion.div>
        </div>
    </div>
);


export default function Sluzby() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [initialAnimComplete, setInitialAnimComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
        if(mounted) {
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

  const services = [
    {
      title: "Tvorba obsahu (content creation)",
      description: "Pomáhame firmám vybudovať dôveryhodnú značku s obrovským dosahom na sociálnych sieťach. Tvoríme vizuálne atraktívny a strategicky silný obsah, ktorý zaujme a predáva.",
      features: [
        "Kreatívna príprava videí",
        "Profesionálna produkcia a réžia",
        "Profesionálny strih a edit",
        "Obsah optimalizovaný pre Reels, TikTok, YouTube Shorts a ďalšie formáty"
      ],
      visual: <ContentCreationVisual />,
    },
    {
      title: "Výkonnostné kampane na Meta platformách",
      description: "Nastavujeme kampane s jediným cieľom – konverzie a zisk. Nerobíme náhodný “boost post”, ale premyslené stratégie na základe dát.",
      features: [
        "Kompletná tvorba a štruktúra kampaní",
        "Optimalizácia podľa výsledkov a cieľov",
        "Retargeting, A/B testing, kreatívy s výkonom",
        "Neustále vyhodnocovanie a zlepšovanie"
      ],
      visual: <PerformanceAdsVisual />,
    },
    {
      title: "Tvorba pristávacích stránok a webov",
      description: "Stránky, ktoré neslúžia len na prezentačné účely – ale na predaj. Každý web dizajnujeme tak, aby mal jasný cieľ: konverziu.",
      features: [
        "Landing pages pre výkonnostné kampane",
        "Webové stránky na mieru",
        "UX/UI zamerané na akciu (scroll, klik, formulár)",
        "Jednoduchá a jasná navigácia"
      ],
      visual: <WebDevVisual />,
    },
    {
      title: "Správa sociálnych sietí",
      description: "Budujeme konzistentnú a dôveryhodnú komunikáciu s vaším publikom. Vy sa venujete firme, my sa postaráme o značku.",
      features: [
        "Tvorba príspevkov a storičiek",
        "Postovanie podľa stratégie a kalendára",
        "Odpovedanie na správy a komentáre",
        "Angažovanie sa s publikom na dennej báze"
      ],
      visual: <SocialMediaVisual />,
    },
    {
      title: "CRM systém s vlastnou aplikáciou",
      description: "Získané leady nemajú hodnotu, ak s nimi neviete pracovať. Preto poskytujeme nástroj, ktorý vám zjednoduší správu kontaktov, e-mailing a vyhodnocovanie výkonu.",
      features: [
        "Zbieranie všetkých vyplnených formulárov na jednom mieste",
        "Automatizovaný e-mail marketing a follow-up sekvencie",
        "Rýchly prehľad o výkonnosti, štatistikách a zdrojoch dopytov",
        "Vlastný prístup cez intuitívnu aplikáciu"
      ],
      visual: <CRMVisual />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-28 pb-32">
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black via-black/80 via-60% to-transparent z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
              >
                Služby, ktoré vám pomáhajú efektívnejšie rásť.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
              >
                Robíme to, čo funguje. Každá naša služba je zameraná na rast, výkon a konkrétny výsledok. Prinášame riešenia, ktoré sú v súlade s vašimi cieľmi nie univerzálne balíčky.
              </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-10"
            >
              <ModernCTAButton href="/kontakt?modal=true">
                Začnime s konzultáciou
              </ModernCTAButton>
            </motion.div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 top-[55%] -translate-y-1/2 w-[55rem] h-[55rem] pointer-events-none z-0 overflow-hidden">
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
                alt="Inverted circle background"
                layout="fill"
                objectFit="contain"
                quality={100}
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)'
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Services Sections */}
        <div className="py-24 sm:py-32 space-y-24 sm:space-y-32">
            {services.map((service, index) => (
                <section key={index} className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-stretch">
                        <motion.div 
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                            className={`mb-12 lg:mb-0 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {service.title}
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-gray-300">
                                {service.description}
                            </p>
                            <div className="mt-6 border-t border-white/10 pt-6">
                                <h3 className="font-semibold text-white">To Zahŕňa:</h3>
                                <ul className="mt-4 space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0"/>
                                            <span className="text-neutral-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                            className={`h-full ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                        >
                              {service.visual}
                        </motion.div>
                    </div>
                </section>
            ))}
        </div>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
            >
              <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
                Pripravení na rast?
              </h3>
              <p className="text-xl text-slate-300 mb-8">
                Ozvite sa nám a posuňme váš biznis na novú úroveň.
              </p>
              <ModernCTAButton href="/kontakt?modal=true">
                Začnime s konzultáciou
              </ModernCTAButton>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-slate-700/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-400">
            <p>&copy; 2025 HubHigh. Všetky práva vyhradené.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}