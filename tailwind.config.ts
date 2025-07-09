import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },

      spacing: {
        header: "60px",
      },
      height: {
        "screen-header": "calc(100vh - theme('spacing.header'))",
      },
      zIndex: {
        header: 100,
      },
    },
    screens: {
      xs: { max: "480px" },
      sm: "481px",
      md: "769px",
      lg: "1025px",
      xl: "1281px",
    },
  },
  plugins: [],
};
export default config;
