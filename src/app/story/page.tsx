'use client';

import { useEffect } from 'react';
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
  }
];

export default function StoryPage() {
  useEffect(() => {
    // Prevent pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="fixed top-0 w-full z-[100] p-4">
        <Link href="/" className="text-sm hover:text-accent transition-colors">
          ← Back
        </Link>
      </header>

      <div className="gallery-container">
        <div className="gallery-stack">
          {storyImages.slice(0, 5).map((image) => (
            <div 
              key={image.src}
              className="story-image"
              role="button"
              tabIndex={0}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
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