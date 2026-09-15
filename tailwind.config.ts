import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chassis: "#f7f2eb",
        panel: "#fcf9f5",
        recessed: "none",
        ink: "#242522",
        label: "#6e6b66",
        accent: "#e8783c",
        shadow: "#d9d1c6",
        deep: "#b5aa9c"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Roboto Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        card: "none",
        floating: "none",
        pressed: "none",
        recessed: "none",
        sharp: "none"
      },
      transitionTimingFunction: {
        mechanical: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }
    }
  },
  plugins: []
};

export default config;
