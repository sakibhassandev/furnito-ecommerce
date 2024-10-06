/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "428px",
      },
      backgroundImage: {
        "hero-bg": "url('/src/assets/images/hero-img.webp')",
      },
      keyframes: {
        "swatch-pulse": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.9)" },
        },
      },
      animation: {
        "swatch-pulse": "swatch-pulse 1.2s ease-in infinite alternate",
      },
    },
  },
  plugins: [],
};
