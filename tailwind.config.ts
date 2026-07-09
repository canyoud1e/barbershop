import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        bg: {
          DEFAULT: '#101010',
          surface: '#161616',
          card: '#1c1c1c',
          elevated: '#242424',
        },
        // Accent — premium gold
        accent: {
          DEFAULT: '#D4AF37',
          dim: '#AA8C2C',
          subtle: '#4A3E15',
        },
        // Text
        text: {
          primary: '#EDEDED',
          secondary: '#A3A3A3',
          muted: '#737373',
        },
        // Borders
        border: {
          DEFAULT: '#282828',
          light: '#383838',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        section: '5rem',
        'section-lg': '8rem',
      },
      borderRadius: {
        card: '1rem',
        'card-lg': '1.5rem',
        pill: '9999px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.4)',
        glow: '0 0 24px rgba(232,232,232,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
