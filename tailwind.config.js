/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A192F',
          'navy-dark': '#060E1A',
          'navy-light': '#132A4A',
          blue: '#1E3E62',
          gold: '#D97706',
          'gold-light': '#F59E0B',
          'gold-dark': '#B45309',
          'gold-subtle': '#FEF3C7',
          surface: '#F8FAFC',
          'surface-card': '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          dark: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 4px 20px -2px rgba(10, 25, 47, 0.06), 0 2px 6px -1px rgba(10, 25, 47, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(10, 25, 47, 0.12), 0 4px 12px -2px rgba(10, 25, 47, 0.08)',
        'cta': '0 10px 25px -3px rgba(217, 119, 6, 0.35)',
      },
    },
  },
  plugins: [],
}
