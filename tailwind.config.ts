import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5E50F4",
        secondary: "#B1F9F3",
        error: "#F45050",
        textColor: "#212121",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      zIndex: {},
    },
  },
  plugins: [],
};
export default config;
