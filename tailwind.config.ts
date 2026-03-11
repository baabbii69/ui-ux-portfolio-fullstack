import type { Config } from "tailwindcss";

// NOTE: Tailwind v4 uses CSS-first configuration (@theme in globals.css).
// This file is kept for compatibility but the real config is in globals.css.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
