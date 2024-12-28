'use client';

import { useState } from 'react';
import Menu from "@/components/Menu/Menu";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleProgressComplete = () => {
    setCurrentIndex((prev) => (prev + 1) % 11);
  };

  const displayNumber = String(currentIndex + 1).padStart(2, '0');

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Counter */}
      <div className="absolute top-[2vh] left-[2vh] lg:top-[4vh] lg:left-[4vh] text-sm text-muted">
        ({displayNumber} /11)
      </div>

      {/* Menu Toggle */}
      <div className="absolute top-[2vh] right-[2vh] lg:top-[4vh] lg:right-[4vh]">
        <Menu />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center">
        <div className="w-full max-w-[2000px] mx-auto px-[4vw] lg:px-[8vw]">
          {/* Content Container */}
          <div className="relative">
            {/* Text Section */}
            <div className="w-full lg:w-[70%]">
              <h1 className="tracking-[-0.02em] space-y-[2vh] lg:space-y-[4vh]">
                <div>
                  <span className="block text-[min(10vw,7rem)] lg:text-[min(7vw,8rem)] leading-[1.1] text-foreground">
                    <span className="font-neue">Carlota i Guille</span>
                  </span>
                </div>
                <div className="relative text-right -mr-[5vw] lg:-mr-[2vw] z-10">
                  <span className="block italic text-[min(8vw,6rem)] lg:text-[min(5.5vw,7rem)] leading-[1.1] text-foreground">
                    30 d&apos;Agost del 
                    <span className="mix-blend-screen"> 2025</span>
                  </span>
                </div>
                <div className="relative ml-[2vw] lg:ml-[4vw] z-10">
                  <span className="block text-[min(8vw,6rem)] lg:text-[min(5vw,6rem)] leading-[1.1] font-neue text-foreground">
                    Finca La Baumeta
                  </span>
                </div>
              </h1>

              {/* Mobile Logo */}
              <div className="mt-16 block lg:hidden w-full px-4">
                <div className="relative aspect-[3/2]">
                  <Image
                    src="/gallery/whitelogo.png"
                    alt="Logo"
                    fill
                    className="object-contain dark:invert"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block scale-[0.85] origin-right">
              <ImageGallery 
                onProgressComplete={handleProgressComplete}
                currentIndex={currentIndex}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-[2vh] left-[2vh] lg:bottom-[4vh] lg:left-[4vh] flex items-center gap-2 text-sm text-foreground">
        <Link href="/story" className="flex items-center gap-2 hover:text-accent transition-colors">
          <span className="grid place-items-center w-6 h-6">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2h12M2 8h12M2 14h12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </span>
          Our Story
        </Link>
      </div>
    </div>
  );
}
