/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Royal Purple Theme
        'royal-purple': '#6C2BD9',
        'deep-purple': '#3B1A6B',
        'dark-purple': '#1A0A33',
        'light-purple': '#B49BDF',
        'lavender': '#E8D9F5',
        'amethyst': '#9B5DE5',
        'plum': '#5A189A',
        
        // Gold accents
        'soft-gold': '#D4AF37',
        'gold-shimmer': '#F5D6A8',
        
        // Neutrals
        cream: '#FFF8F0',
        'warm-white': '#FFFAF7',
        'dark-charcoal': '#2D1B1B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #3B1A6B 0%, #6C2BD9 50%, #9B5DE5 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF8F0 0%, #FFFAF7 50%, #E8D9F5 100%)',
        'gradient-royal': 'linear-gradient(135deg, #1A0A33 0%, #3B1A6B 50%, #6C2BD9 100%)',
      },
      boxShadow: {
        'luxury': '0 8px 32px rgba(108, 43, 217, 0.15)',
        'purple-glow': '0 8px 32px rgba(108, 43, 217, 0.25)',
        'royal': '0 8px 48px rgba(108, 43, 217, 0.4)',
        'gold': '0 8px 32px rgba(212, 175, 55, 0.2)',
      }
    },
  },
  plugins: [],
}
