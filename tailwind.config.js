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
    },
  },
  plugins: [],
};
