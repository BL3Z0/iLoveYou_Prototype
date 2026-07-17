/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main theme - Deep Crimson Red
        'deep-crimson': '#8B0000',
        'crimson': '#DC143C',
        'dark-crimson': '#5C0000',
        'royal-red': '#9B1B30',
        'ruby': '#E0115F',
        'velvet': '#4A0E0E',
        
        // Warm backgrounds
        cream: '#FFF8F0',
        'warm-white': '#FFFAF7',
        'rose-cream': '#FFF5F0',
        
        // Gold accents
        'soft-gold': '#D4AF37',
        'gold-shimmer': '#F5D6A8',
        
        // Neutrals
        'dark-charcoal': '#2D1B1B',
        'mauve': '#6B3E59',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #E0115F 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF8F0 0%, #FFFAF7 50%, #FFF5F0 100%)',
        'gradient-royal': 'linear-gradient(135deg, #4A0E0E 0%, #8B0000 50%, #9B1B30 100%)',
      },
      boxShadow: {
        'luxury': '0 8px 32px rgba(139, 0, 0, 0.15)',
        'red-glow': '0 8px 32px rgba(220, 20, 60, 0.25)',
        'royal': '0 8px 48px rgba(139, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
