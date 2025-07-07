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
  },
  plugins: [],
};
export default config;
