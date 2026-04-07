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
        accent: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in':      'fadeIn 0.4s cubic-bezier(0.4,0,0.2,1) both',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.4,0,0.2,1) both',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.4,0,0.2,1) both',
        'float':        'float 3.5s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'shimmer':      'shimmer 1.6s ease infinite',
      },
      keyframes: {
        fadeIn:   { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
        slideUp:  { '0%': { transform:'translateY(14px)', opacity:'0' }, '100%': { transform:'translateY(0)', opacity:'1' } },
        scaleIn:  { '0%': { transform:'scale(.94)', opacity:'0' }, '100%': { transform:'scale(1)', opacity:'1' } },
        float:    { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-6px)' } },
        shimmer:  { '0%': { backgroundPosition:'100% 0' }, '100%': { backgroundPosition:'-100% 0' } },
      },
      boxShadow: {
        xs:  '0 1px 2px rgba(15,23,42,.04)',
        sm:  '0 1px 3px rgba(15,23,42,.08), 0 1px 2px rgba(15,23,42,.04)',
        md:  '0 4px 6px rgba(15,23,42,.06), 0 2px 4px rgba(15,23,42,.04)',
        lg:  '0 10px 15px rgba(15,23,42,.08), 0 4px 6px rgba(15,23,42,.04)',
        xl:  '0 20px 25px rgba(15,23,42,.10), 0 8px 10px rgba(15,23,42,.04)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}