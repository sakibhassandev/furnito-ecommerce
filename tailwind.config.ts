import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
} satisfies Config;
