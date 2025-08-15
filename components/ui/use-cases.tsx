"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
            width={image.width}
            height={image.height}
            className={cn("w-full h-auto rounded-lg mb-4", {
              "max-h-[60vh] object-contain": index === 1 && j === 0,
            })}
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
  const fadeDuration = 0.1;
  const opacity = useTransform(
    scrollYProgress,
    [
      i / numStudies,
      i / numStudies + fadeDuration,
      (i + 1) / numStudies - fadeDuration,
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
  const fadeDuration = 0.1;
  const opacity = useTransform(
    scrollYProgress,
    [
      i / numStudies,
      i / numStudies + fadeDuration,
      (i + 1) / numStudies - fadeDuration,
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
          let imageSize;
          if (i === 0) {
            imageSize = { width: Math.floor(image.width * 5.0), height: Math.floor(image.height * 5.0) };
          } else if (i === 1) {
            if (j === 0) {
              imageSize = { width: Math.floor(image.width * 0.25), height: Math.floor(image.height * 0.25) };
            } else {
              imageSize = { width: Math.floor(image.width * 0.45), height: Math.floor(image.height * 0.45) };
            }
          } else {
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


export const StickyScrollUseCases = ({ caseStudies }: { caseStudies: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-8 lg:hidden">
        {caseStudies.map((study, index) => (
          <MobileUseCaseCard key={index} study={study} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[400vh] hidden lg:block">
      <div className="sticky top-24 grid grid-cols-1 lg:grid-cols-5 gap-16 h-[calc(100vh-12rem)] items-center bg-black/[0.96]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[40vw] max-w-[600px] h-[40vw] max-h-[600px] bg-blue-900/30 rounded-full blur-[200px]"></div>
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
