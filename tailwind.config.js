/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0891b2',
        secondary: '#fbbf24',
        'text-dark': '#1f2937',
        'text-light': '#6b7280',
      }
    },
  },
  plugins: [],
}
