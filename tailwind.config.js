/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        panda: {
          black: '#0C0A08',
          dark: '#1A1510',
          surface: '#141008',
          red: '#EE1C25',
          'red-dark': '#C41820',
          'red-glow': '#EE1C25',
          white: '#FFF8F0',
          muted: '#B8A890',
          border: '#3A2E20',
          cream: '#FFF8F0',
          gold: '#FFFF00',
          'gold-dark': '#E6D800',
          'gold-muted': '#D4C840',
          yellow: '#FFFF00',
        },
      },
      fontFamily: {
        display: ['"Ma Shan Zheng"', '"Bebas Neue"', 'cursive'],
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Noto Sans SC"', '"Inter"', 'system-ui', 'sans-serif'],
        chinese: ['"Ma Shan Zheng"', 'cursive'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 12vw, 8rem)', { lineHeight: '0.95', letterSpacing: '0.04em' }],
        'display-lg': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1', letterSpacing: '0.03em' }],
        'display-md': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'lantern-sway': 'lanternSway 3s ease-in-out infinite',
        'cloud-drift': 'cloudDrift 20s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        lanternSway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      backgroundImage: {
        'chinese-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23EE1C25' stroke-width='0.5' opacity='0.08'/%3E%3C/svg%3E")`,
        'lattice': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='20' height='20' fill='none' stroke='%23FFFF00' stroke-width='0.4' opacity='0.06'/%3E%3Crect x='20' y='20' width='20' height='20' fill='none' stroke='%23FFFF00' stroke-width='0.4' opacity='0.06'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
