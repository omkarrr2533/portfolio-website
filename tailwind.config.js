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
        /* ── shadcn semantic tokens (HSL vars defined in globals.css) ── */
        border: 'hsl(var(--sc-border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--sc-accent) / <alpha-value>)',
          foreground: 'hsl(var(--sc-accent-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--sc-card) / <alpha-value>)',
          foreground: 'hsl(var(--sc-card-foreground) / <alpha-value>)',
        },

        /* ── Dark backgrounds ── */
        void:    '#050807',
        abyss:   '#030504',
        surface: '#0A100E',

        /* ── Accent system ── */
        emerald: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        neon: {
          cyan:   '#22D3EE',
          purple: '#818CF8',
          green:  '#34D399',
          pink:   '#F472B6',
          blue:   '#60A5FA',
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
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '6px',
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
        'marquee':      'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn:       { from:{ opacity:0 }, to:{ opacity:1 } },
        slideUp:      { from:{ transform:'translateY(24px)', opacity:0 }, to:{ transform:'translateY(0)', opacity:1 } },
        slideInRight: { from:{ transform:'translateX(100%)', opacity:0 }, to:{ transform:'translateX(0)', opacity:1 } },
        scaleIn:      { from:{ transform:'scale(0.93)', opacity:0 }, to:{ transform:'scale(1)', opacity:1 } },
        float:        { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-10px)' } },
        shimmer:      { '0%':{ backgroundPosition:'200% 0' }, '100%':{ backgroundPosition:'-200% 0' } },
        glowPulse:    { '0%,100%':{ boxShadow:'0 0 12px rgba(16,185,129,0.3)' }, '50%':{ boxShadow:'0 0 35px rgba(16,185,129,0.7)' } },
        borderSpin:   { from:{ '--angle':'0deg' }, to:{ '--angle':'360deg' } },
        cursorBlink:  { '0%,100%':{ opacity:1 }, '50%':{ opacity:0 } },
        marquee:      { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
      },
      boxShadow: {
        'glow-sm':  '0 0 12px rgba(16,185,129,0.25)',
        'glow':     '0 0 24px rgba(16,185,129,0.4)',
        'glow-lg':  '0 0 48px rgba(16,185,129,0.55)',
        'glow-cyan':'0 0 24px rgba(34,211,238,0.4)',
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
