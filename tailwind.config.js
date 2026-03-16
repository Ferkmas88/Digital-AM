/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['80px', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'hero-sm': ['52px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'section': ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'section-sm': ['36px', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
      },
      spacing: {
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '1200px',
      },
    },
  },
  plugins: [],
}
