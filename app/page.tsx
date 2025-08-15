"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, Easing } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/moving-border";
import { ModernCTAButton } from "@/components/ui/modern-cta-button";
import { AnimatedCircle } from "@/components/ui/animated-circle";
import { ScrollShape } from "@/components/ui/scroll-shape";
import { SpinningCircle } from "@/components/ui/spinning-circle";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { MovingBorder } from "@/components/ui/moving-border";
import { ClientLogos } from "@/components/ui/client-logos";
import { Quote } from "@/components/ui/quote";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Hook to fix logo animation on mobile
const useLogoAnimationFix = () => {
  useEffect(() => {
    const fixLogoAnimation = () => {
      const logoContainer = document.getElementById('logo-scroll-container');
      if (logoContainer && window.innerWidth <= 768) {
        // Reset animation on mobile to prevent spinning
        logoContainer.style.animation = 'none';
        logoContainer.offsetHeight; // Trigger reflow
        logoContainer.style.animation = 'scroll-mobile-smooth 15s linear infinite';
      }
    };

    // Fix on mount and resize
    fixLogoAnimation();
    window.addEventListener('resize', fixLogoAnimation);
    
    return () => window.removeEventListener('resize', fixLogoAnimation);
  }, []);
};

const UseCaseCard = ({ result, index, disableEntryAnimation = false }: { result: any; index: number, disableEntryAnimation?: boolean }) => {
  const motionProps = disableEntryAnimation ? {} : {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" as Easing },
    viewport: { once: true, amount: 0.3 }
  };
  return (
    <motion.div
      {...motionProps}
      className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40"
    >
      <div className="p-8 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-3 bg-black/50 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Prípadová štúdia #{index + 1}
            </span>
          </span>
          <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {result.highlight}
          </span>
        </div>
        
        <div className="grid gap-8 items-center lg:grid-cols-2">
          <div className="space-y-4 text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
              {result.description}
            </h3>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              {result.detail}
            </p>
          </div>
          
          <div className="md:w-3/4 lg:w-full space-y-4">
            {(result.images || []).map((src: string, i: number) => (
              <div key={i} className="bg-neutral-950/50 p-3 rounded-xl border border-neutral-800 shadow-inner">
                <Image
                  src={src}
                  alt={`${result.title} screenshot ${i + 1}`}
                  width={1200}
                  height={900}
                  className="rounded-md w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// New HowWeWork component
const HowWeWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-20 px-4">
      {/* Timeline line for desktop */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-neutral-800 hidden md:block origin-top" style={{ backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
        <motion.div className="w-full h-full bg-gradient-to-b from-purple-500 to-blue-500 origin-top" style={{ scaleY: lineScaleY, background: 'linear-gradient(to bottom, #8B5CF6, #3B82F6)' }} />
      </div>
      {/* Timeline line for mobile */}
      <div className="absolute left-8 top-0 bottom-0 w-1 -translate-x-1/2 bg-neutral-800 md:hidden origin-top" style={{ backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
        <motion.div className="w-full h-full bg-gradient-to-b from-purple-500 to-blue-500 origin-top" style={{ scaleY: lineScaleY, background: 'linear-gradient(to bottom, #8B5CF6, #3B82F6)' }} />
      </div>

      <div className="space-y-24">
        {howWeWork.map((step, index) => (
          <TimelineItem key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

// New TimelineItem component
const TimelineItem = ({ step, index }: { step: typeof howWeWork[0], index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "relative flex items-start gap-4 md:gap-8",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Desktop spacer */}
      <div className="hidden md:block md:w-1/2" />

      {/* Timeline Node */}
      <div className="absolute left-8 top-1 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-4 h-4 bg-black border-2 border-purple-500 rounded-full"
        />
        <motion.div 
          className="absolute inset-0 border-2 border-purple-500 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{ scale: 3, opacity: [0, 0.7, 0] }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        />
      </div>

      {/* Content card */}
      <div className="w-full md:w-1/2 ml-16 md:ml-0 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl backdrop-blur-md shadow-lg shadow-purple-900/20 hover:border-purple-500/50 transition-colors duration-300">
        <span className="text-sm font-semibold text-purple-400 mb-2 block">
          Krok {step.number}
        </span>
        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-neutral-400 mb-4">{step.description}</p>
        <div className="space-y-3">
          {step.points.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
              <p className="text-neutral-300 text-sm">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const howWeWork = [
  {
    number: "1",
    title: "Úvodná Konzultácia",
    description: "Úvodný hovor, kde sa spoznáme a zanalyzujeme vašu aktuálnu situáciu a zistíme, ako vám vieme pomôcť.",
    points: [
      "Porozprávame sa o vašom biznise, cieľoch a problémoch",
      "Zhodnotíme silné a slabé stránky",
      "Navrhneme konkrétnu stratégiu šitú na mieru",
      "Využívame dáta a overené princípy, ktoré reálne fungujú"
    ]
  },
  {
    number: "2",
    title: "Tvorba a realizácia kampane",
    description: "Zameranie sa na realizáciu dohodnutej stratégie od kreatívy po spustenie kampane.",
    points: [
      "Pripravíme, natočíme a zostriháme obsah (videá na mieru pre sociálne siete)",
      "Obsah prispôsobíme rôznym cieľovým skupinám a platformám",
      "Pripravíme pristávaciu stránku zameranú na konverzie",
      "Spustíme výkonnostnú kampaň s jasným cieľom: Priviesť klientov a predaje"
    ]
  },
  {
    number: "3",
    title: "Optimalizácia a rast",
    description: "Po spustení to len začína – sledujeme, zlepšujeme, testujeme.",
    points: [
      "Sledujeme výkon kampaní a testujeme variácie",
      "Priebežne optimalizujeme podľa dát",
      "Hľadáme nové príležitosti na zlepšenie",
      "Budujeme s vami dlhodobý a konzistentný rast"
    ]
  }
];

const results = [
  {
    description: "Klinika ktorej sme zdvihli mesačné tržby o 180% a vygenerovali cez 600 kvalitných leadov za 3 mesiace",
    detail: "Za klik sme platili iba 0,18 €, čo nám umožnilo zvýšiť návštevnosť na pristávacej stránke o viac ako 500 %.",
    highlight: "180%"
  },
  {
    description: "Za 30 dní priniesla naša kampaň pre estetickú ambulanciu rovnaký počet nových pacientov, ako mali dovtedy za celý štvrťrok, s investíciou 900€",
    detail: "Nová ambulancia v strede Slovenska, ktorá mala pomalší rozbeh a prvý rok fungovala v stratách, sa po začiatku spolupráce s nami dostala do zisku už v prvom mesiaci.",
    highlight: "30 dní"
  },
  {
    description: "Firme s vírivkami a príslušenstvom priniesla naša kampaň za mesiac a pol tržby vo výške viac ako 35 000 €.",
    detail: "Firme sme za toto obdobie priniesli 40 kvalitných záujemcov, z ktorých si až 12 zakúpilo produkt v hodnote nad 3 000 €.",
    highlight: "35 000€"
  }
];


const timeline = [
  {
    year: "2022",
    title: "Založenie agentúry",
    description: "Začali sme s jediným cieľom - pomáhať firmám rásť cez výkonný a strategický obsah."
  },
  {
    year: "40+",
    title: "Pomohli sme viac ako 40 firmám",
    description: "Zviditeľnili sme značky, nastavili sociálne siete na výkon a zvýšili predaje tam, kde to predtým nefungovalo."
  },
  {
    year: "60+",
    title: "Vybudovali sme komunitu so 60+ podnikateľmi",
    description: "Vytvorili sme vzdelávaciu platformu, kde sme majiteľom firiem a agentúr pomohli pochopiť reklamu a rozbehnúť rast na sociálnych sieťach."
  },
  {
    year: "58k+",
    title: "Vygenerovali sme 58 000+ leadov",
    description: "Kvalitné dopyty pre našich klientov aj vlastné kampane – nie len impresie a lajky."
  },
  {
    year: "8M+",
    title: "Dosiahli sme 8 000 000+ videní",
    description: "Obsah, ktorý sme vytvorili, zasahoval presne cieľovky našich klientov naprieč všetkými platformami."
  },
  {
    year: "3+",
    title: "Už viac než 3 roky pomáhame firmám rásť",
    description: "Stalo sa to našou vášňou. Našou drogou. My vyhrávame vtedy, keď vyhrávame vy."
  }
];

const faqs = [
  {
    question: "Ako prebieha spolupráca s vami?",
    answer: "Spoluprácu začíname úvodným konzultačným hovorom, kde zistíme, či a ako vám vieme pomôcť. Následne pripravíme stratégiu, vytvoríme obsah a spustíme kampaň. Všetko nastavíme tak, aby ste mohli delegovať túto časť práce a sústrediť sa na rast firmy."
  },
  {
    question: "Potrebujem mať už nejaký obsah alebo sociálne siete?",
    answer: "Nie, nepotrebujete. Postaráme sa o celý proces – od prípravy konceptu až po natáčanie, strih a nastavenie reklám. Vy budete len súčasťou videí, pretože naším cieľom je spraviť z vás/vašich zamestnancov influencerov vašej vlastnej značky. Vďaka tomu budete pôsobiť ľudsky, dôveryhodne a relevantne, tak, ako to dnešný online svet vyžaduje."
  },
  {
    question: "Koľko to celé stojí?",
    answer: "Cena závisí od rozsahu spolupráce a cieľov. V úvode si spolu prejdeme vaše potreby a pripravíme riešenie s ktorým to spoločne nakopneme."
  },
  {
    question: "Ako rýchlo môžem vidieť výsledky?",
    answer: "Prvé výsledky a návratnosť investície (ROI) zvyčajne vidíme už v prvom mesiaci po spustení kampane. V priemere do 3 mesiacov dokážeme zaznamenať výraznú zmenu, ktorá vám umožní reálny rast a stabilný príjem."
  },
  {
    question: "Čo ak to nebude fungovať?",
    answer: "Naše služby sú postavené na dátach, nie na náhodných pokusoch. Priebežne sledujeme výkon, testujeme, optimalizujeme – a robíme maximum preto, aby vám spolupráca reálne zarábala."
  }
];

// FAQ Component with proper state management
const FAQItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div 
        onClick={onToggle}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-purple-500/50"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-white mb-2 pr-4">
          {question}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '1rem' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-gray-300 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

// Real-time Scroll-Driven Cards with Immediate Response
const StackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"] // Start when section enters viewport, complete when centered
  });

  // Define final positions for vertical stepwise flow with more spacing
  const positions = [
    { x: "70%", y: "15%", name: "top-right" },      // Card 1: Top-right
    { x: "30%", y: "50%", name: "middle-left" },    // Card 2: Middle-left (offset)
    { x: "70%", y: "85%", name: "bottom-right" }    // Card 3: Bottom-right
  ];

  // State for dynamic path
  const [pathData, setPathData] = React.useState("M70,20 Q50,35 30,50 Q50,65 70,80");

  // Pre-calculate all transforms outside the map function to avoid React Hooks violation
  const cardProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Smoother sequential card movement with overlap for fluid animation
  const card1X = useTransform(scrollYProgress, [0, 0.4], ["50%", positions[0].x]);
  const card1Y = useTransform(scrollYProgress, [0, 0.4], ["50%", positions[0].y]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);

  const card2X = useTransform(scrollYProgress, [0.25, 0.65], ["50%", positions[1].x]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.65], ["50%", positions[1].y]);
  const card2Scale = useTransform(scrollYProgress, [0.25, 0.65], [0.85, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.65], [0.7, 1]);

  const card3X = useTransform(scrollYProgress, [0.5, 0.9], ["50%", positions[2].x]);
  const card3Y = useTransform(scrollYProgress, [0.5, 0.9], ["50%", positions[2].y]);
  const card3Scale = useTransform(scrollYProgress, [0.5, 0.9], [0.8, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.5, 0.9], [0.7, 1]);

  // Store all transforms in an array for easy access
  const cardTransforms = [
    { x: card1X, y: card1Y, scale: card1Scale, opacity: card1Opacity },
    { x: card2X, y: card2Y, scale: card2Scale, opacity: card2Opacity },
    { x: card3X, y: card3Y, scale: card3Scale, opacity: card3Opacity }
  ];

  // Smoother path animation with multiple segments - fixed timing
  const pathLength1 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const pathLength2 = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const pathLength3 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.8, 0.9], [0, 1, 1, 0.7]);

  // Calculate dynamic path based on card positions
  const updatePath = React.useCallback(() => {
    const cardRefs = [card1Ref, card2Ref, card3Ref];
    const container = containerRef.current;
    const svg = svgRef.current;
    
    if (!container || !svg) return;
    
    const containerRect = container.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    
    const cardPositions = cardRefs.map((ref) => {
      if (!ref.current) return { x: 50, y: 50 };
      
      const cardRect = ref.current.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      // Convert to SVG viewBox coordinates (0-100)
      const svgX = ((cardCenterX - svgRect.left) / svgRect.width) * 100;
      const svgY = ((cardCenterY - svgRect.top) / svgRect.height) * 100;
      
      return { x: Math.max(0, Math.min(100, svgX)), y: Math.max(0, Math.min(100, svgY)) };
    });
    
    if (cardPositions.every(pos => pos.x !== 50 || pos.y !== 50)) {
      const [pos1, pos2, pos3] = cardPositions;
      
      // Create smooth S-curve connecting all three cards
      const controlPoint1X = (pos1.x + pos2.x) / 2;
      const controlPoint1Y = (pos1.y + pos2.y) / 2;
      const controlPoint2X = (pos2.x + pos3.x) / 2;
      const controlPoint2Y = (pos2.y + pos3.y) / 2;
      
      const newPath = `M${pos1.x},${pos1.y} Q${controlPoint1X},${controlPoint1Y} ${pos2.x},${pos2.y} Q${controlPoint2X},${controlPoint2Y} ${pos3.x},${pos3.y}`;
      setPathData(newPath);
    }
  }, []);

  // Update path on mount, scroll, and resize
  React.useEffect(() => {
    updatePath();
  }, [updatePath]);

  React.useEffect(() => {
    const handleResize = () => updatePath();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePath]);

  // Update path when scroll changes card positions
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', () => {
      requestAnimationFrame(updatePath);
    });
    return unsubscribe;
  }, [scrollYProgress, updatePath]);

  return (
    <div ref={containerRef} className="relative h-[120vh] sm:h-[160vh] w-full max-w-4xl mx-auto">
      {/* SVG for connecting routes - tied directly to scroll */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#FFFFFF" floodOpacity="0.2"/>
          </filter>
        </defs>
        
        {/* Animated path segments that draw progressively */}
        <motion.path
          d="M70,20 Q50,35 30,50 Q50,65 70,80"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            pathLength: pathLength1,
            opacity: pathOpacity
          }}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M30,50 Q50,65 70,80"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            pathLength: pathLength2,
            opacity: pathOpacity
          }}
          vectorEffect="non-scaling-stroke"
        />
        {/* Connection dots at intersections */}
        <motion.circle
          cx="70" cy="20"
          r="3"
          fill="url(#routeGradient)"
          filter="url(#glow)"
          style={{
            opacity: pathOpacity,
            scale: pathLength1
          }}
        />
        <motion.circle
          cx="30" cy="50"
          r="3"
          fill="url(#routeGradient)"
          filter="url(#glow)"
          style={{
            opacity: pathOpacity,
            scale: pathLength2
          }}
        />
        <motion.circle
          cx="70" cy="80"
          r="3"
          fill="url(#routeGradient)"
          filter="url(#glow)"
          style={{
            opacity: pathOpacity,
            scale: pathLength3
          }}
        />
      </svg>

      {/* Cards container */}
      <div className="relative w-full h-full">
        {howWeWork.map((step, index) => {
          // Get pre-calculated transforms for this card
          const transforms = cardTransforms[index];

          return (
            <motion.div
              key={index}
              initial={{
                x: "-50%",
                y: "-50%",
                scale: 0.3,
                opacity: 0
              }}
              style={{
                x: "-50%",
                y: "-50%",
                left: transforms.x,
                top: transforms.y,
                scale: transforms.scale,
                opacity: transforms.opacity,
                zIndex: 20 + index
              }}
              className="absolute w-full max-w-sm sm:max-w-lg lg:max-w-2xl"
            >
              <div className="bg-black/60 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out hover:border-purple-500/30 group relative overflow-hidden">
                {/* Enhanced inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-transparent rounded-3xl"></div>
                {/* Corner accent with purple tint */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/[0.08] to-transparent rounded-tr-3xl"></div>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/[0.05] to-transparent rounded-bl-3xl"></div>
                <div className="relative z-10">
                <div className="flex flex-col sm:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8">
                  {/* Step number */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.3 + 0.2,
                        ease: [0.68, -0.55, 0.265, 1.55]
                      }}
                      viewport={{ once: true }}
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-600/20 to-purple-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300"
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">{step.number}</span>
                    </motion.div>
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 leading-tight group-hover:text-purple-100 transition-colors duration-300 tracking-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-zinc-200 leading-relaxed mb-4 sm:mb-6 lg:mb-7 group-hover:text-zinc-100 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Enhanced bullet points */}
                    <div className="space-y-2 sm:space-y-3 text-left">
                      {step.points.slice(0, 3).map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 sm:mt-2.5 flex-shrink-0 group-hover:bg-purple-300 transition-colors duration-300 shadow-sm" />
                          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
                            {point}
                          </p>
                        </div>
                      ))}
                      {step.points.length > 3 && (
                        <div className="text-base text-white/60 pl-5 mt-3 font-medium group-hover:text-white/80 transition-colors duration-300">
                          +{step.points.length - 3} ďalších
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  useLogoAnimationFix(); // Fix logo animation on mobile
  
  useEffect(() => {
    const scroller = document.querySelector(".scroller");
    if (scroller) {
      const scrollerContent = Array.from(scroller.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        (duplicatedItem as HTMLElement).setAttribute("aria-hidden", "true");
        scroller.appendChild(duplicatedItem);
      });
    }
  }, []);

  const caseStudies = [
    {
      title: "Klinika ktorej sme zdvihli mesačné tržby o 180% a vygenerovali cez 600 kvalitných leadov za 3 mesiace",
      description: "Za klik sme platili iba 0,18 €, čo nám umožnilo zvýšiť návštevnosť na pristávacej stránke o viac ako 500 %.",
      value: "30 dní",
      images: [{ src: "/14.png", width: 1147, height: 262 }],
      tags: ["Lead Generation", "Zvýšenie tržieb", "Výkonnostný marketing"]
    },
    {
      title: "Za 30 dní priniesla naša kampaň pre estetickú ambulanciu rovnaký počet nových pacientov, ako mali dovtedy za celý štvrťrok, s investíciou 900€",
      description: "Nová ambulancia v strede Slovenska, ktorá mala pomalší rozbeh a prvý rok fungovala v stratách, sa po začiatku spolupráce s nami dostala do zisku už v prvom mesiaci.",
      value: "150 000€",
      images: [
        { src: "/15.jpg", width: 1206, height: 1539 },
        { src: "/16.png", width: 1023, height: 319 },
      ],
      tags: ["B2B leady", "Budovanie značky", "Strategické partnerstvá"]
    },
    {
      title: "Firme s vírivkami a príslušenstvom priniesla naša kampaň za mesiac a pol tržby vo výške viac ako 35 000 €.",
      description: "Firme sme za toto obdobie priniesli 40 kvalitných záujemcov, z ktorých si až 12 zakúpilo produkt v hodnote nad 3 000 €.",
      value: "35 000€",
      images: [{ src: "/17.png", width: 757, height: 380 }],
      tags: ["Predaj", "Vysoká hodnota objednávky", "Rýchly zisk"]
    }
  ];

  const results = [
    {
      description: "Klinika ktorej sme zdvihli mesačné tržby o 180% a vygenerovali cez 600 kvalitných leadov za 3 mesiace",
      detail: "Za klik sme platili iba 0,18 €, čo nám umožnilo zvýšiť návštevnosť na pristávacej stránke o viac ako 500 %.",
      highlight: "180%"
    },
    {
      description: "Za 30 dní priniesla naša kampaň pre estetickú ambulanciu rovnaký počet nových pacientov, ako mali dovtedy za celý štvrťrok, s investíciou 900€",
      detail: "Nová ambulancia v strede Slovenska, ktorá mala pomalší rozbeh a prvý rok fungovala v stratách, sa po začiatku spolupráce s nami dostala do zisku už v prvom mesiaci.",
      highlight: "30 dní"
    },
    {
      description: "Firme s vírivkami a príslušenstvom priniesla naša kampaň za mesiac a pol tržby vo výške viac ako 35 000 €.",
      detail: "Firme sme za toto obdobie priniesli 40 kvalitných záujemcov, z ktorých si až 12 zakúpilo produkt v hodnote nad 3 000 €.",
      highlight: "35 000€"
    }
  ];
  
  useEffect(() => {
    setIsMounted(true);
    let ticking = false;
    
    const handleScrollStacking = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Hero content folds up behind circle, then fades
          const heroContent = document.querySelector('.hero-content') as HTMLElement;
          if (heroContent) {
            // Fade out more gradually after folding
            const heroOpacity = Math.max(0, 1 - Math.max(0, (scrollY - 400) / 400));
            heroContent.style.opacity = heroOpacity.toString();
          }
          
          // Dashboard content fade in (opacity increases with scroll)  
          const appImage = document.querySelector('.app-image') as HTMLElement;
          if (appImage) {
            const dashboardOpacity = Math.min(1, scrollY / 300);
            appImage.style.opacity = dashboardOpacity.toString();
          }
          
          // Hero section stays visible - only uses 3D transforms to fold behind
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Delay scroll listener to prevent initial stutters
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScrollStacking, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScrollStacking);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased relative scroll-smooth snap-y snap-mandatory max-w-full">
      {/* Global Background gradients */}
      <div className="fixed inset-0 bg-black pointer-events-none z-0"></div>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-start justify-center pt-28 overflow-hidden snap-start bg-black/[0.96]">
          {/* Subtle purple gradient top right */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/20 via-purple-950/10 to-transparent pointer-events-none"></div>
          
          
          <motion.div 
            className="relative text-center max-w-6xl mx-auto px-4 pt-2 hero-content hero-section-center-holder"
            style={{
              zIndex: useTransform(scrollY, [0, 200, 400], [25, 15, 5]),
              rotateX: useTransform(scrollY, [0, 400], [0, 45]), // More dramatic fold
              y: useTransform(scrollY, [0, 400], [0, -100]), // Move up more to be behind circle
              scale: useTransform(scrollY, [0, 400], [1, 0.7]), // Scale down more
              transformPerspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
              className="inline-flex items-center justify-center mb-4"
            >
              <div className="bg-zinc-800/40 text-white px-4 py-2 sm:px-6 rounded-full text-xs sm:text-sm font-medium border border-zinc-600/50 backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-zinc-400 font-bold rounded-full animate-pulse"></div>
                  Pomáhame majiteľom firiem rásť a predávať cez sociálne siete

                </span>
              </div>
            </motion.div>
            <motion.h1
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent leading-tight mb-6 sm:mb-8 mt-4"
            >
              Získavajte klientov a dopyty vďaka systému, ktorý buduje dôveru a predáva
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto mb-10 sm:mb-12"
            >
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
              Skvelá služba alebo produkt nestačí, ak nej nikto nevie.
Pomáhame firmám vytvoriť silnú online identitu, ktorá premení pozornosť na reálne
výsledky.
Sme dravý tím, ktorý neustále sleduje trendy a tvorí videá, ktoré nielen vyzerajú dobre ale
hlavne fungujú.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <ModernCTAButton href="/kontakt?modal=true">
                Začnime s konzultáciou
              </ModernCTAButton>
            </motion.div>
          </motion.div>
          <SpinningCircle />
        </section>

        {/* Testimonials Section */}
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
            
            <div className="relative w-full overflow-hidden">
              <div 
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
              </div>
            </div>
          </div>
        </section>

        <Quote 
          text="Sme realisti v digitálnom svete. Vieme, že vám záleží na reálnom raste a zisku nie len na tom, čo vyzerá dobre."
          containerClassName="-mt-1"
        />

        <section id="vysledky" className="relative py-8 snap-start bg-black/[0.96] -mt-1">
          <div className="py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6"
                >
                  Nepotrebujete lajky. Potrebujete{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    leady, predaje a rast.
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-4"
                >
                  Všetko, čo tvoríme, má jediný cieľ – priniesť vám reálne čísla, ktoré pomáhajú vašej firme rásť.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg text-purple-400 font-medium"
                >
                  Žiadne "možno", žiadne výhovorky – len výsledky.
                </motion.p>
              </div>

              {/* Professional Glass Container for Results */}
                          <div className="hidden lg:block relative">
                <StickyScrollUseCases caseStudies={caseStudies} />
              </div>
              <div className="block lg:hidden space-y-8">
                {caseStudies.map((study, index) => (
                  <MobileUseCaseCard key={index} study={study} index={index} />
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mt-12"
              >
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ako Fungujeme Section - Stacked Cards with Scroll Unstacking */}
        <section className="relative min-h-[200vh] overflow-hidden snap-start" id="how-we-work">
          {/* Hero-style background */}
          <div className="absolute inset-0 bg-black/[0.96]"></div>
          
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/50"></div>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 flex flex-col items-center">
            {/* Hero-style header */}
            <div className="text-center mb-16 sm:mb-24">
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center justify-center mb-6 sm:mb-8"
              >
                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium border border-purple-500/30 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    Náš trojkrokový proces
                  </span>
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent leading-tight mb-6 sm:mb-8"
              >
                Ako{" "}
                <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  fungujeme
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed max-w-4xl mx-auto font-medium px-4"
              >
                Systematický prístup, ktorý zabezpečuje výsledky. Od prvého stretnutia až po kontinuálny rast vašej značky.
              </motion.p>
            </div>

            {/* Stacked Cards Container */}
            <div className="w-full flex justify-center">
              <HowWeWork />
            </div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16 sm:mt-20 md:mt-32 pb-12 sm:pb-16 md:pb-20"
            >
              <ModernCTAButton href="/kontakt?modal=true">
                Začnime s konzultáciou
              </ModernCTAButton>

            </motion.div>
          </div>
        </section>

        {/* O nás Section */}
        <section className="relative py-10 sm:py-14">
          {/* Enhanced background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.96] via-purple-950/5 to-black/[0.96]"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/5 via-transparent to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 sm:mb-6"
              >
                O nás
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-purple-400 mb-6 sm:mb-8 px-4"
              >
                Niesme len agentúra, ktorú si najmete. Sme váš partner, s ktorým vaša firma porastie.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
              >
                Sme najkreatívnejší a najvýkonnejší tím, ktorý nepracuje preto, že musí ale preto, že chce. My vyhrávame vtedy, keď vyhrávame vy a preto nám na výsledkoch tak záleží!
              </motion.p>
            </div>
          </div>
        </section>

        {/* Horizontal Timeline Section */}
        <section className="relative pt-10 sm:pt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-center"
              >
                Cesta, ktorou sme si prešli
            </motion.h2>
                </div>
          <HorizontalTimeline />
        </section>

        {/* Sekcia rozhodnutia */}
        <section className="relative pt-10 sm:pt-14">
          <div className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-8"
                >
                  Ďalšia šanca už nemusí prísť.
                </motion.h2>
                <div className="max-w-4xl mx-auto space-y-4 mb-12">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-gray-300"
                  >
                    Ten správny čas na zmenu nebude o mesiac ani o pol roka.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-gray-300"
                  >
                    To, že ste sa dostali až sem, nie je náhoda.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-gray-300"
                  >
                    Niečo vás sem priviedlo. A to rozhodnutie – to je teraz len na vás.
                  </motion.p>
                </div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-semibold text-white mb-8"
                >
                  Vyberte si možnosť
                </motion.h3>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="relative bg-slate-900/50 border border-slate-700 rounded-2xl p-8 text-left hover:border-slate-600 transition-colors group"
                  >
                    <div className="text-6xl font-semibold text-gray-600 mb-4">1.</div>
                    <p className="text-gray-300 leading-relaxed">
                      Vydržím ešte pol roka. Potom sa možno niečo zmení lebo teraz niesom pripravený budovať svoju značku na sociálnych sieťach ani zvyšovať obrat.
                    </p>
                    <p className="text-gray-500 mt-4 italic">
                      Možno neskôr...
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-gray-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-2xl p-8 text-left hover:border-purple-400/70 transition-colors group"
                  >
                    <div className="text-6xl font-semibold text-purple-400 mb-4">2.</div>
                    <p className="text-white leading-relaxed">
                      Zabezpečte si stabilný príjem, delegujte väčšinu kreatívnej operatívy, získajte viacej záujemcov a sústreďte sa na to, čo je pre vašu firmu naozaj dôležité.
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <ModernCTAButton href="/kontakt?modal=true">
                    Začnime s konzultáciou
                  </ModernCTAButton>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcia QnA */}
        <section className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-semibold text-white mb-6"
              >
                Často kladené otázky
              </motion.h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => {
                    const newOpenFAQ = openFAQ === index ? null : index;
                    setOpenFAQ(newOpenFAQ);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <BackgroundBeams className="z-0" />
    
    </div>
  );
}

const MobileUseCaseCard = ({ study, index }: { study: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden"
    >
      <div className="p-8">
        <span className="inline-flex items-center gap-3 bg-black/50 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold self-start mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Prípadová štúdia #{index + 1}
            </span>
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mt-4">{study.title}</h3>
        <p className="text-xl md:text-2xl text-neutral-300 mt-4 leading-relaxed">{study.description}</p>
      </div>
      <div className="bg-neutral-950/50 p-4">
        {study.images.map((image: any, j: number) => (
          <Image
            key={j}
            src={image.src}
            alt={`${study.title} screenshot ${j + 1}`}
            width={Math.floor(image.width * 2.2)}
            height={Math.floor(image.height * 2.2)}
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>
    </motion.div>
  );
};

const UseCaseContent = ({
  study,
  i,
  scrollYProgress,
  numStudies,
}: {
  study: any;
  i: number;
  scrollYProgress: any;
  numStudies: number;
}) => {
  const transition_point = 0.15;
  const opacity = useTransform(
    scrollYProgress,
    [
      i / numStudies - transition_point,
      i / numStudies,
      (i + 1) / numStudies - transition_point,
      (i + 1) / numStudies,
    ].map((v) => Math.max(0, Math.min(1, v))),
    [0, 1, 1, 0]
  );
  const scale = useTransform(opacity, [0, 1], [0.95, 1]);
  const y = useTransform(opacity, [0, 1], ["3rem", "0rem"]);

  return (
    <motion.div
      key={i}
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, scale, y }}
    >
      <span className="inline-flex items-center gap-3 bg-black/50 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold self-start mb-6">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
        <span className="bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          Prípadová štúdia #{i + 1}
        </span>
      </span>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
        {study.title}
      </h3>
      <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
        {study.description}
      </p>
    </motion.div>
  );
};

const UseCaseImage = ({
  study,
  i,
  scrollYProgress,
  numStudies,
}: {
  study: any;
  i: number;
  scrollYProgress: any;
  numStudies: number;
}) => {
  const transition_point = 0.15;
  const opacity = useTransform(
    scrollYProgress,
    [
      i / numStudies - transition_point,
      i / numStudies,
      (i + 1) / numStudies - transition_point,
      (i + 1) / numStudies,
    ].map((v) => Math.max(0, Math.min(1, v))),
    [0, 1, 1, 0]
  );
  const scale = useTransform(opacity, [0, 1], [0.95, 1]);
  const y = useTransform(opacity, [0, 1], ["3rem", "0rem"]);
  return (
    <motion.div
      key={i}
      className="absolute inset-0 p-4"
      style={{ opacity, scale, y }}
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-4">
        {study.images.map((image: any, j: number) => {
          // Balanced sizing with individual image control
          let imageSize;
          if (i === 0) {
            // First case study - bigger
            imageSize = { width: Math.floor(image.width * 4.0), height: Math.floor(image.height * 4.0) };
          } else if (i === 1) {
            // Second case study - balance the two images
            if (j === 0) {
              // First image (the tall one) - make smaller
              imageSize = { width: Math.floor(image.width * 0.25), height: Math.floor(image.height * 0.25) };
            } else {
              // Second image (the wide one) - make bigger
              imageSize = { width: Math.floor(image.width * 0.45), height: Math.floor(image.height * 0.45) };
            }
          } else {
            // Third case study - much bigger for better visibility
            imageSize = { width: Math.floor(image.width * 2.5), height: Math.floor(image.height * 2.5) };
          }
          
          return (
            <Image
              key={j}
              src={image.src}
              alt={`${study.title} screenshot ${j + 1}`}
              width={imageSize.width}
              height={imageSize.height}
              className="rounded-lg w-auto h-auto object-contain max-w-full"
              style={{ maxHeight: '70vh' }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};


const StickyScrollUseCases = ({ caseStudies }: { caseStudies: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardIndex = useTransform(scrollYProgress, (pos) => {
    return Math.floor(pos * caseStudies.length);
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-24 grid grid-cols-1 lg:grid-cols-5 gap-16 h-[calc(100vh-12rem)] items-center bg-black/[0.96]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-[10%] -translate-y-[60%] w-[800px] h-[800px] bg-purple-900/50 rounded-full blur-[200px]"></div>
          <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[30%] w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[200px]"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center px-4 space-y-4 z-10 lg:col-span-2">
          {caseStudies.map((study, i) => (
            <UseCaseContent
              key={i}
              study={study}
              i={i}
              scrollYProgress={scrollYProgress}
              numStudies={caseStudies.length}
            />
          ))}
        </div>
        <div className="relative w-full h-full z-10 lg:col-span-3">
          {caseStudies.map((study, i) => (
            <UseCaseImage
              key={i}
              study={study}
              i={i}
              scrollYProgress={scrollYProgress}
              numStudies={caseStudies.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BurstTimeline = () => {
  const ref = useRef<HTMLElement & { items?: any[] }>(null);

  useEffect(() => {
    const timelineData = [
      {
        headline: "2022",
        sub: "Založenie agentúry. Začali  sme s jediným cieľom - pomáhať firmám rásť cez výkonný a strategický obsah."
      },
      {
        headline: "40+",
        sub: "Pomohli sme viac ako 40 firmám. Zviditeľnili sme zn ačky, nastavili sociálne siete na výkon a zvýšili predaje tam, kde to predtým nefungovalo."
      },
      {
        headline: "60+",
        sub: "Vybudovali sme komunitu so 60+ podnikateľmi. Vytvorili sme vzdelávaciu platformu, kde sme majiteľom firiem a agentúr pomohli pochopiť reklamu a rozbehnúť rast na sociálnych sieťach."
      },
      {
        headline: "58k+",
        sub: "Vygenerovali sme 58 000+ leadov. Kvalitné dopyty pre našich klientov aj vlastné kampane – nie len impresie a lajky."
      },
      {
        headline: "8M+",
        sub: "Dosiahli sme 8 000 000+ videní. Obsah, ktorý sme vytvorili, zasahoval presne cieľovky našich klientov naprieč všetkými platformami."
      },
      {
        headline: "3+",
        sub: "Už viac než 3 roky pomáhame firmám rásť. Stalo sa to našou vášňou. Našou drogou. My vyhrávame vtedy, keď vyhrávame vy."
      }
    ];

    if (ref.current) {
      ref.current.items = timelineData;
    }
  }, []);

  const CustomElement = 'burst-headline-sequence' as any;
  return <CustomElement ref={ref} className="burst-timeline-component"></CustomElement>;
};

const DynamicBurstTimeline = dynamic(() => Promise.resolve(BurstTimeline), {
  ssr: false,
});

const HorizontalTimeline = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const isMobile = useIsMobile();

  // each step moves exactly one card width to show the next card fully
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["5%", `-${100 - (100 / timeline.length)}%`]
  );

  if (isMobile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-12">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateX: -90, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.15, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            viewport={{ once: true, amount: 0.3, margin: "-50px" }}
            className="group relative transform-gpu"
          >
            {/* Subtle glow effect for mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.15 + 0.1 }}
              viewport={{ once: true }}
              className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-500/30 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition duration-700 group-hover:duration-300"
            ></motion.div>
            
            {/* Smaller, more compact glass card for mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
              viewport={{ once: true }}
              className="relative bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-6 h-full shadow-2xl"
            >
              <h3 
                className="text-5xl font-bold bg-gradient-to-r from-purple-400/80 to-blue-400/80 bg-clip-text text-transparent mb-3 transition-all duration-500 group-hover:scale-110 [text-shadow:0_0_8px_rgba(192,132,252,0.2)] group-hover:[text-shadow:0_0_15px_rgba(192,132,252,0.4)]"
              >
                {item.year}
              </h3>
              <h4 
                className="text-xl font-semibold text-neutral-100 mb-3"
              >
                {item.title}
              </h4>
              <p 
                className="text-neutral-300 leading-relaxed text-sm"
              >
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-24 h-[calc(100vh-12rem)] flex items-center overflow-hidden w-full">
        <motion.div
          style={{ x }}
          className="flex gap-2 sm:gap-6 md:gap-8 lg:gap-12 px-12"
        >
          {timeline.map((item, index) => (
            <div key={index} className="group relative flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
              
              {/* More pronounced glass card */}
              <div className="relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 h-full">
                <h3 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 transition-all duration-300 group-hover:scale-105 [text-shadow:0_0_8px_rgba(192,132,252,0.3)] group-hover:[text-shadow:0_0_20px_rgba(192,132,252,0.6)]">
                  {item.year}
                </h3>
                <h4 className="text-2xl font-semibold text-neutral-100 mb-4">
                  {item.title}
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const clients = [
  {
    image: "/klienti/1.png",
  },
  {
    image: "/klienti/2.png",
  },
  {
    image: "/klienti/3.png",
  },
  {
    image: "/klienti/4.png",
  },
  {
    image: "/klienti/5.png",
  },
  {
    image: "/klienti/6.png",
  },
  {
    image: "/klienti/7.png",
  },
  {
    image: "/klienti/8.png",
  },
  {
    image: "/klienti/9.png",
  },
  {
    image: "/klienti/10.png",
  },
];
