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
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentPosition = 0;
    let animationFrameId: number;

    const updatePosition = () => {
      const totalWidth = storyImages.length * 100;
      currentPosition = ((currentPosition % totalWidth) + totalWidth) % totalWidth;
      
      setScrollPosition(currentPosition);
      
      // Calculate which image is in the center position
      const centerIndex = Math.floor(currentPosition / 100);
      const centerOffset = (currentPosition % 100) / 100;
      
      // Update active image based on scroll position
      const newActiveIndex = centerOffset > 0.5 ? 
        (centerIndex + 1) % storyImages.length : 
        centerIndex;
      
      setActiveImageIndex(newActiveIndex);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const maxDelta = 20;
      const scrollDelta = Math.max(Math.min(e.deltaY, maxDelta), -maxDelta);
      currentPosition += scrollDelta * 0.3;
      
      setIsMoving(true);
      requestAnimationFrame(updatePosition);
    };

    const handleScrollEnd = () => {
      setIsMoving(false);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mouseleave', handleScrollEnd);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mouseleave', handleScrollEnd);
    };
  }, []);

  const getImageStyle = (index: number) => {
    const totalImages = storyImages.length;
    const adjustedIndex = (totalImages + index - Math.floor(scrollPosition / 100)) % totalImages;
    
    const calculateArchPosition = (idx: number) => {
      const distanceFromCenter = idx - Math.floor(totalImages / 2);
      const step = 80;
      const rotationStep = 8;
      const baseHeight = -55;

      // Calculate scroll progress within current position (0 to 1)
      const scrollProgress = (scrollPosition % 100) / 100;
      
      // Calculate dynamic position based on scroll
      const x = distanceFromCenter * step;
      const nextX = (distanceFromCenter - 1) * step;
      const interpolatedX = x + (nextX - x) * scrollProgress;
      
      // Dynamic rotation
      const rotation = distanceFromCenter * rotationStep;
      const nextRotation = (distanceFromCenter - 1) * rotationStep;
      const interpolatedRotation = rotation + (nextRotation - rotation) * scrollProgress;
      
      // Dynamic vertical offset with more pronounced steps
      let currentOffset = 0;
      if (Math.abs(distanceFromCenter) === 1) currentOffset = 8;      // Images 2 and 3
      else if (Math.abs(distanceFromCenter) === 2) currentOffset = 22; // Images 4 and 5
      else if (Math.abs(distanceFromCenter) === 3) currentOffset = 45; // Images 6 and 7
      else if (Math.abs(distanceFromCenter) > 3) currentOffset = 60;   // Further images
      
      let nextOffset = 0;
      if (Math.abs(distanceFromCenter - 1) === 1) nextOffset = 8;
      else if (Math.abs(distanceFromCenter - 1) === 2) nextOffset = 22;
      else if (Math.abs(distanceFromCenter - 1) === 3) nextOffset = 45; // Keep consistent with current offset
      else if (Math.abs(distanceFromCenter - 1) > 3) nextOffset = 60;
      
      const interpolatedY = baseHeight + currentOffset + (nextOffset - currentOffset) * scrollProgress;
      
      return {
        y: interpolatedY,
        x: interpolatedX,
        rotate: interpolatedRotation,
        z: distanceFromCenter + scrollProgress
      };
    };

    const position = calculateArchPosition(adjustedIndex);
    const isVisible = Math.abs(adjustedIndex - Math.floor(totalImages / 2)) <= 4;
    const isInViewport = position.y < 45;
    const isHovered = index === hoveredImageIndex;

    // Base style for hidden images
    if (!isVisible || !isInViewport) {
      return {
        transform: `translate(-50%, ${position.y}%) translateX(${position.x}%) rotate(${position.rotate}deg) translateZ(-10000px)`,
        zIndex: -1000,
        visibility: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)',
      };
    }

    // Base transform for all visible images
    const baseTransform = `translate(-50%, ${position.y}%) translateX(${position.x}%) rotate(${position.rotate}deg)`;
    
    // Immediate z-index update for hovered state
    if (isHovered) {
      return {
        transform: `scale(1.04) ${baseTransform}`,
        zIndex: 9999,
        visibility: 'visible',
        opacity: 1,
        pointerEvents: 'auto',
        transition: 'transform 0.3s ease-out',
      };
    }

    // Simple z-index for other images
    return {
      transform: baseTransform,
      zIndex: position.x > 0 ? 10 : 5,
      visibility: 'visible',
      opacity: 1,
      transition: isMoving ? 'none' : 'transform 0.3s ease-out',
    };
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <header className="fixed top-0 w-full z-[100] p-4">
        <Link href="/" className="text-sm hover:text-accent transition-colors">
          ← Back
        </Link>
      </header>

      <div 
        ref={containerRef} 
        className="gallery-container"
        onMouseLeave={() => setHoveredImageIndex(null)}
      >
        <div className="gallery-stack">
          {storyImages.map((image, index) => (
            <div 
              key={image.src}
              className="story-image"
              onMouseEnter={() => setHoveredImageIndex(index)}
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