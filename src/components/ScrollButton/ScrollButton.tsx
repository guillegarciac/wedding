'use client';

export default function ScrollButton() {
  return (
    <button 
      className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <span className="sr-only">Scroll down</span>
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        className="animate-bounce"
      >
        <path 
          d="M10 15L3.5 8.5L4.91 7.09L10 12.17L15.09 7.09L16.5 8.5L10 15Z" 
          fill="currentColor"
        />
      </svg>
    </button>
  );
} 