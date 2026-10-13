/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryNavy: '#131E38',
        illiniOrange: '#E87722',
        // Darker orange for small text on light backgrounds (meets WCAG AA).
        orangeInk: '#A84C0A',
        cream: '#FDFBF7',
        sand: '#F4EEE3',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        editorial: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
