import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        neue: ['var(--font-neue)', 'Inter', 'system-ui', 'sans-serif'],
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      transform: {
        'rotate-x-90': 'rotateX(90deg)',
        '-rotate-x-90': 'rotateX(-90deg)',
      },
      translate: {
        'z-6': '6rem',
      },
    },
  },
  plugins: [],
};

export default config;
