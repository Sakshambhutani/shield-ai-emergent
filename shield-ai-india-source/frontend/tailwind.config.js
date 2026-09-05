/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: { DEFAULT: '#0B0D10', 1: '#0F1216', 2: '#12151C', 3: '#181C25', 4: '#1F2430' },
        line: { DEFAULT: '#232937', 2: '#2E3546' },
        paper: { DEFAULT: '#F3EFE6', 2: '#B8B3A8', 3: '#7C7870' },
        sig: { blue: '#3B82F6', amber: '#F59E0B', purple: '#A78BFA', green: '#34D399', red: '#F87171' },
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { transform: 'translateX(24px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
      },
      animation: { rise: 'rise 300ms ease-out both', slideIn: 'slideIn 250ms ease-out both' },
    },
  },
  plugins: [],
};
