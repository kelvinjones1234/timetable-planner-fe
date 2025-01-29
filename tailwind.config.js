/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, rgba(111, 88, 255, 1) 0%, rgba(94, 54, 255, 1) 100%)',
      },
      textColor: {
        'gradient': 'transparent',
      },
    },
  },
  plugins: [],
}