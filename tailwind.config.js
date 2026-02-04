/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2E7DD6',
          red: '#EF4444',
        },
        dark: '#1F2937',
      },
    },
  },
  plugins: [],
}
