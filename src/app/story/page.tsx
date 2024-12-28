'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const storyImages = [
  { 
    src: '/gallery/image1.jpg',
    title: 'First moment',
    year: '2024',
    location: 'Barcelona'
  },
  { 
    src: '/gallery/image2.jpg',
    title: 'Walking together',
    year: '2024',
    location: 'Barcelona'
  },
  { 
    src: '/gallery/image3.jpg',
    title: 'City life',
    year: '2023',
    location: 'Barcelona'
  },
  { 
    src: '/gallery/image4.jpg',
    title: 'Together',
    year: '2023',
    location: 'Home'
  },
  { 
    src: '/gallery/image5.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
  {
    src: '/gallery/image6.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
  {
    src: '/gallery/image7.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
  {
    src: '/gallery/image8.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
  {
    src: '/gallery/image9.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
  {
    src: '/gallery/image10.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
  {
    src: '/gallery/image11.jpg',
    title: 'Special moments',
    year: '2024',
    location: 'Barcelona'
  },
];

export default function StoryPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentPosition = 0;
    let animationFrameId: number;

    const updatePosition = () => {
      if (!isMoving) return;
      
      // Normalize position for seamless infinite loop
      const totalWidth = storyImages.length * 100;
      currentPosition = ((currentPosition % totalWidth) + totalWidth) % totalWidth;
      
      setScrollPosition(currentPosition);
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setIsMoving(true);
      
      currentPosition += e.deltaY * 0.3;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMoving]);

  const getImageStyle = (index: number) => {
    const totalImages = storyImages.length;
    
    const normalizedScroll = scrollPosition % (totalImages * 100);
    const adjustedIndex = (totalImages + index - Math.floor(normalizedScroll / 100)) % totalImages;
    
    const calculateArchPosition = (idx: number) => {
      const distanceFromCenter = idx - Math.floor(totalImages / 2);
      const step = 55;
      const rotationStep = 8;
      
      const baseHeight = -52;
      
      let verticalOffset;
      if (Math.abs(distanceFromCenter) === 1) {
        verticalOffset = 5;
      } else if (Math.abs(distanceFromCenter) === 2) {
        verticalOffset = 20;
      } else if (Math.abs(distanceFromCenter) === 3) {
        verticalOffset = 40;
      } else if (Math.abs(distanceFromCenter) > 3) {
        verticalOffset = 55;
      } else {
        verticalOffset = 0;
      }
      
      return {
        y: baseHeight + verticalOffset,
        x: distanceFromCenter * step,
        rotate: distanceFromCenter * rotationStep,
        z: Math.abs(distanceFromCenter)
      };
    };

    const position = calculateArchPosition(adjustedIndex);
    const transitionOffset = (normalizedScroll % 100);
    
    // Only show images that are within the visible range (5 positions from center)
    const isVisible = Math.abs(adjustedIndex - Math.floor(totalImages / 2)) <= 5;
    
    return {
      transform: `
        translate(-50%, ${position.y}%) 
        translateX(calc(${position.x}% + ${transitionOffset}px)) 
        rotate(${position.rotate}deg)
      `,
      zIndex: totalImages - position.z,
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? 1 : 0
    };
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <header className="fixed top-0 w-full z-[100] p-4">
        <Link href="/" className="text-sm hover:text-accent transition-colors">
          ← Back
        </Link>
      </header>

      <div ref={containerRef} className="gallery-container">
        <div className="gallery-stack">
          {storyImages.map((image, index) => (
            <div 
              key={image.src}
              className="story-image"
              style={{ 
                transform: getImageStyle(index).transform, 
                zIndex: getImageStyle(index).zIndex, 
                visibility: getImageStyle(index).visibility as 'visible' | 'hidden' 
              }}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, (max-width: 1440px) 570px, 670px"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 