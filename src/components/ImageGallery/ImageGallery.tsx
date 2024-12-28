'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ANIMATION_DURATION = 4000;
const FPS = 30;

interface ImageGalleryProps {
  onProgressComplete: () => void;
  currentIndex: number;
}

const images = [
  { src: '/gallery/image1.jpg', title: 'Yes, it\'s us. We are marrying' },
  { src: '/gallery/image2.jpg', title: 'Walking down the street' },
  { src: '/gallery/image3.jpg', title: 'New Years Eve' },
  { src: '/gallery/image4.jpg', title: 'Tik Toking' },
  { src: '/gallery/image5.jpg', title: 'Skiing in the Alps' },
  { src: '/gallery/image6.jpg', title: 'Dj Set' },
  { src: '/gallery/image7.jpg', title: 'Mirror Mirror on the wall' },
  { src: '/gallery/image8.jpg', title: 'Comiols' },
  { src: '/gallery/image9.jpg', title: 'How F***ing Elegant' },
  { src: '/gallery/image10.jpg', title: 'Keinemusik 2024' },
  { src: '/gallery/image11.jpg', title: 'Yes, that\'s what she said' },
];

export default function ImageGallery({ onProgressComplete, currentIndex }: ImageGalleryProps) {
  const [progress, setProgress] = useState(0);
  const progressCompleteRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (ANIMATION_DURATION / (1000 / FPS)));
        if (newProgress >= 100) {
          progressCompleteRef.current = true;
          return 0;
        }
        return newProgress;
      });
    }, 1000 / FPS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progressCompleteRef.current) {
      onProgressComplete();
      progressCompleteRef.current = false;
    }
  }, [progress, onProgressComplete]);

  return (
    <div className="mt-28 w-[400px]">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* Current Image */}
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].title}
          fill
          className="object-cover transition-transform duration-700"
          priority
        />
        
        {/* Next Image (for transition) */}
        <Image
          src={images[(currentIndex + 1) % images.length].src}
          alt={images[(currentIndex + 1) % images.length].title}
          fill
          className={`object-cover absolute inset-0 transition-transform duration-700 ${
            progress === 100 ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">{images[currentIndex].title}</span>
        <div className="relative w-8 h-8">
          {/* Circular Progress */}
          <svg className="w-full h-[85%] -rotate-90 transform">
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white/20"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${progress * 0.88} 100`}
              className="text-white transition-all duration-100"
            />
          </svg>
          <button className="absolute inset-0 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 