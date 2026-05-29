import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chassis: "#e0e5ec",
        panel: "#f0f2f5",
        recessed: "#d1d9e6",
        ink: "#2d3436",
        label: "#4a5568",
        accent: "#e88736",
        shadow: "#babecc",
        deep: "#a3b1c6"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Roboto Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        card: "8px 8px 16px #babecc, -8px -8px 16px #ffffff",
        floating: "12px 12px 24px #babecc, -12px -12px 24px #ffffff, inset 1px 1px 0 rgba(255,255,255,0.6)",
        pressed: "inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff",
        recessed: "inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff",
        sharp: "4px 4px 8px rgba(0,0,0,0.15), -1px -1px 1px rgba(255,255,255,0.8)"
      },
      transitionTimingFunction: {
        mechanical: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }
    }
  },
  plugins: []
};

export default config;
