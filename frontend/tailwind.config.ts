import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Mission/game aesthetic per PRD section 17
        "utopia-bg": "#0a0e1a",
        "utopia-accent": "#00e5ff",
        "utopia-warn": "#ff2e63",
        "utopia-success": "#39ff14",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
