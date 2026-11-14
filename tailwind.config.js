/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
        surface: {
          0:   '#030712',
          50:  '#060918',
          100: '#080c1e',
          200: '#0d1230',
        },
      },
      backgroundImage: {
        'aurora': 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(168,85,247,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 80%, rgba(34,211,238,0.07) 0%, transparent 60%)',
      },
      animation: {
        'spin-slow':   'spin 20s linear infinite',
        'pulse-slow':  'pulse 4s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'aurora':      'aurora-shift 8s ease-in-out infinite',
        'marquee':     'marquee-scroll 30s linear infinite',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'slide-up':    'slideUp 0.5s ease forwards',
        'gradient-x':  'gradientX 4s ease infinite',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeIn:      { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        gradientX:   { '0%,100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' }, '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' } },
        'aurora-shift': {
          '0%,100%': { opacity: '0.5', transform: 'scale(1) translate(0,0)' },
          '33%':     { opacity: '0.8', transform: 'scale(1.1) translate(2%,2%)' },
          '66%':     { opacity: '0.6', transform: 'scale(0.95) translate(-2%,1%)' },
        },
        'marquee-scroll': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      boxShadow: {
        'glow-sm':  '0 0 20px rgba(99,102,241,0.2)',
        'glow':     '0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.1)',
        'glow-lg':  '0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(99,102,241,0.15)',
        'glow-violet': '0 0 40px rgba(168,85,247,0.25)',
        'glow-cyan':   '0 0 40px rgba(34,211,238,0.2)',
        'inner-glow':  'inset 0 0 60px rgba(99,102,241,0.1)',
        'card':     '0 4px 6px -1px rgba(0,0,0,0.5), 0 2px 4px -1px rgba(0,0,0,0.3)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1)',
      },
    },
  },
  plugins: [],
}
