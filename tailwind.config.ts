import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const toRem = (px: number): string => {
  return `${px / 16}rem`;
};

const spacings = [2, 4, 6, 8, 12, 16, 18, 24, 48];
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      DEFAULT: "9px",
    },
    colors: {
      black: "#000",
      dark: {
        900: "#000",
      },
      light: {
        900: "#fff",
      },
      primary: {
        900: "#E8F6B6",
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    spacing: {
      "site-gutter": toRem(12),
      ...Object.fromEntries(spacings.map((px) => [`${px}px`, toRem(px)])),
    },
  },
  plugins: [],
};
export default config;
