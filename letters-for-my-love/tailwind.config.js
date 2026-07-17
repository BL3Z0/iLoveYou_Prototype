/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'warm-white': '#FFFAF7',
        'deep-rose': '#C9184A',
        burgundy: '#800F2F',
        blush: '#FF8FA3',
        'dark-charcoal': '#2D1B1B',
        mauve: '#6B3E59',
        // Oxblood colors for final envelope
        oxblood: '#3d0c11',
        'oxblood-light': '#5c121a',
        'oxblood-medium': '#7a1823',
        'oxblood-bright': '#9e1a2a',
        'old-rose': '#d4a373',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FFF8F0 0%, #FFFAF7 50%, #FFF0E6 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #2D1B1B 0%, #800F2F 50%, #D4AF37 100%)',
        'gradient-oxblood': 'linear-gradient(135deg, #3d0c11 0%, #5c121a 50%, #9e1a2a 100%)',
      },
      boxShadow: {
        luxury: '0 8px 32px rgba(192, 24, 74, 0.15)',
        'rose-glow': '0 8px 32px rgba(192, 24, 74, 0.25)',
        oxblood: '0 8px 32px rgba(158, 26, 42, 0.4)',
      }
    },
  },
  plugins: [],
}
