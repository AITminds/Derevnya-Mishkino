import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#edf0e8",
        linen: "#f7f8f2",
        clay: "#bcc6b7",
        stone: "#221d19",
        pine: "#3f4e39",
        accent: "#667b57",
      },
      fontFamily: {
        brand: ["var(--font-brand)"],
        serif: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(62, 76, 55, 0.10)",
      },
      backgroundImage: {
        "warm-radial": "radial-gradient(circle at top, rgba(255,255,255,0.94), rgba(237,241,232,0.72) 55%, rgba(225,231,219,0.9))",
      },
    },
  },
  plugins: [],
};

export default config;
