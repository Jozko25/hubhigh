'use client';

import React from 'react';
import Image from 'next/image';
import './LogoCarousel.css';

const LogoCarousel = () => {
  // Array of logo file names (automatically generated from 1.png to 10.png)
  const logoFiles = Array.from({ length: 10 }, (_, i) => `${i + 1}.png`);

  return (
    <div className="w-full py-16">
      {/* Heading and subheading section */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Dôverujú nám
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Firmy, ktorým sme pomohli dosiahnuť reálne výsledky
        </p>
      </div>

      <div className="logo-carousel-wrapper">
        <div className="logo-track">
          {/* First set of logos */}
          <div className="logo-set">
            {logoFiles.map((logo, index) => (
              <div className="logo-item" key={`first-${index}`}>
                <Image
                  src={`/klienti/${logo}`}
                  alt={`Client logo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 120px, 140px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {/* Second set of logos (duplicate for seamless loop) */}
          <div className="logo-set">
            {logoFiles.map((logo, index) => (
              <div className="logo-item" key={`second-${index}`}>
                <Image
                  src={`/klienti/${logo}`}
                  alt={`Client logo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 120px, 140px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
