'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2" 
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background text-foreground z-50 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 z-50"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Content */}
          <div className="min-h-screen p-8 flex flex-col lg:grid lg:grid-cols-2 lg:p-20">
            {/* Left Side - Home and Image (Hidden on mobile) */}
            <div className="hidden lg:block">
              <div className="mb-8">
                <span className="text-muted text-sm">01</span>
                <span className="font-display text-8xl italic ml-4">
                  Home
                </span>
              </div>
              <div className="relative w-64 h-96">
                <Image
                  src="/hero-image.png"
                  alt="Menu featured image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right Side - Navigation */}
            <div className="flex-1 flex flex-col justify-center">
              <nav className="space-y-8 lg:space-y-12">
                {[
                  { href: '/story', label: 'Location', num: '02' },
                  { href: '/details', label: 'RSVP', num: '03' },
                  { href: '/rsvp', label: 'Contributions', num: '04' }
                ].map(({ href, label, num }) => (
                  <Link 
                    key={href}
                    href={href} 
                    className="group relative block perspective-1000 pl-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-muted text-sm absolute left-0 top-0">
                      {num}
                    </span>
                    <div className="relative transition-transform duration-500 transform-style-3d group-hover:[transform:rotateX(90deg)]">
                      <span className="font-display text-4xl lg:text-8xl block">
                        {label}
                      </span>
                      <span className="font-display text-4xl lg:text-8xl italic absolute inset-0 -rotate-x-90 origin-top transform-3d translate-z-[6rem] opacity-0 group-hover:opacity-100">
                        {label}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-white/10 lg:absolute lg:bottom-20 lg:left-20 lg:right-20 lg:border-0">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end text-sm text-muted gap-4">
                <div>
                  <p>CARLOTA & GUILLE</p>
                  <p>WEDDING 2025</p>
                </div>
                <div className="lg:text-right">
                  <p>2025 - Finca La Baumenta, La Quar</p>
                  <button className="underline mt-2 hover:text-white transition-colors">
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 