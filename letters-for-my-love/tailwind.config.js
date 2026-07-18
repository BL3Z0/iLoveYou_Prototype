/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rose-pink': '#EC5598',
        'deep-red': '#8B0000',
        'shiny-red': '#CC0000',
        'warm-red': '#B22222',
        'dark-red': '#4A0000',
        'parchment': '#F5E6C8',
        'aged-paper': '#E8D5B5',
        'burnt-edge': '#8B7355',
        cream: '#FFF8F0',
        'soft-gold': '#D4AF37',
        'gold-shimmer': '#F5D6A8',
        'dark-charcoal': '#2D1B1B',
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
        'gradient-red': 'linear-gradient(135deg, #4A0000 0%, #8B0000 50%, #CC0000 100%)',
        'gradient-parchment': 'linear-gradient(135deg, #F5E6C8 0%, #E8D5B5 50%, #D4C4A8 100%)',
      },
      boxShadow: {
        'medieval': '0 8px 32px rgba(139, 0, 0, 0.3), 0 0 60px rgba(139, 0, 0, 0.1)',
        'rose-glow': '0 8px 32px rgba(236, 85, 152, 0.3)',
      }
    },
  },
  plugins: [],
}
