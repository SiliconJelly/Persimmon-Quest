import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        persimmon: "#F4522D",
        onyx: "#0A0A0A",
        ink: "#1A1A1A"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-jp)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
