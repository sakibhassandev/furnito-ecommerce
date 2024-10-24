import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "428px",
      },
      backgroundImage: {
        "hero-bg": "url('/assets/images/hero-img.webp')",
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
export default config;
