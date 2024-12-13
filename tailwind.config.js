/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5722",
        secondary: "#FFA726",
        dark: "#2C2C2C",
        light: "#FFFFFF",
        gray: {
          100: "#F8F8F8",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Volkhov', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/decore.svg')",
      },
    },
  },
  plugins: [],
}
