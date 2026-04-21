/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Dark backgrounds ── */
        void:    '#060D1F',
        abyss:   '#050A17',
        surface: '#0D1526',
        card:    '#0F1C35',
        muted:   '#1A2740',

        /* ── Accent system ── */
        indigo: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
        },
        neon: {
          cyan:   '#06B6D4',
          purple: '#7C3AED',
          green:  '#10B981',
          pink:   '#EC4899',
          blue:   '#3B82F6',
        },

        /* ── Text ── */
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in':      'fadeIn 0.5s cubic-bezier(0.4,0,0.2,1) both',
        'slide-up':     'slideUp 0.5s cubic-bezier(0.4,0,0.2,1) both',
        'slide-in-right':'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.4,0,0.2,1) both',
        'float':        'float 4s ease-in-out infinite',
        'shimmer':      'shimmer 1.8s ease infinite',
        'glow-pulse':   'glowPulse 2.5s ease-in-out infinite',
        'border-spin':  'borderSpin 6s linear infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
      },
      keyframes: {
        fadeIn:       { from:{ opacity:0 }, to:{ opacity:1 } },
        slideUp:      { from:{ transform:'translateY(24px)', opacity:0 }, to:{ transform:'translateY(0)', opacity:1 } },
        slideInRight: { from:{ transform:'translateX(100%)', opacity:0 }, to:{ transform:'translateX(0)', opacity:1 } },
        scaleIn:      { from:{ transform:'scale(0.93)', opacity:0 }, to:{ transform:'scale(1)', opacity:1 } },
        float:        { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-10px)' } },
        shimmer:      { '0%':{ backgroundPosition:'200% 0' }, '100%':{ backgroundPosition:'-200% 0' } },
        glowPulse:    { '0%,100%':{ boxShadow:'0 0 12px rgba(99,102,241,0.3)' }, '50%':{ boxShadow:'0 0 35px rgba(99,102,241,0.7)' } },
        borderSpin:   { from:{ '--angle':'0deg' }, to:{ '--angle':'360deg' } },
        cursorBlink:  { '0%,100%':{ opacity:1 }, '50%':{ opacity:0 } },
      },
      boxShadow: {
        'glow-sm':  '0 0 12px rgba(99,102,241,0.25)',
        'glow':     '0 0 24px rgba(99,102,241,0.4)',
        'glow-lg':  '0 0 48px rgba(99,102,241,0.55)',
        'glow-cyan':'0 0 24px rgba(6,182,212,0.4)',
        'card':     '0 4px 32px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)',
        'card-hover':'0 12px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
        'inner':    'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise':            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}