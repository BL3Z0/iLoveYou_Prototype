/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Red Theme Colors
        'dark-red': '#1a0000',
        'deep-red': '#4A0000',
        'blood-red': '#660000',
        'shiny-red': '#8B0000',
        'crimson': '#B22222',
        'rose-pink': '#EC5598',
        'soft-gold': '#D4AF37',
        'gold-shimmer': '#F5D6A8',
        'cream': '#FFF8F0',
        'warm-white': '#FFFAF7',
        'dark-charcoal': '#2D1B1B',
        'parchment': '#F5E6C8',
        'aged-paper': '#E8D5B5',
        'burnt-edge': '#8B7355',
      },
      fontFamily: {
        medieval: ['MedievalSharp', 'cursive'],
        cursive: ['Great Vibes', 'cursive'],
        cinematic: ['Cinzel Decorative', 'serif'],
        oldlondon: ['Old London', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #EC5598 0%, #C41E6B 50%, #8B0A3A 100%)',
        'gradient-red': 'linear-gradient(135deg, #1a0000 0%, #4A0000 50%, #8B0000 100%)',
        'gradient-deep-red': 'linear-gradient(135deg, #1a0000 0%, #660000 40%, #8B0000 100%)',
        'gradient-parchment': 'linear-gradient(135deg, #F5E6C8 0%, #E8D5B5 50%, #D4C4A8 100%)',
        'radial-gradient': 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'medieval': '0 8px 32px rgba(139, 0, 0, 0.3), 0 0 60px rgba(139, 0, 0, 0.1)',
        'rose-glow': '0 8px 32px rgba(236, 85, 152, 0.3)',
        'deep-red': '0 8px 48px rgba(139, 0, 0, 0.5), 0 0 80px rgba(139, 0, 0, 0.2)',
        'gold': '0 8px 32px rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 8px 48px rgba(212, 175, 55, 0.3), 0 0 80px rgba(212, 175, 55, 0.1)',
        'dark': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'float': 'floatHeart 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        floatHeart: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px) rotate(10deg) scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 40px rgba(139, 0, 0, 0.3)' },
          '50%': { boxShadow: '0 0 80px rgba(139, 0, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
