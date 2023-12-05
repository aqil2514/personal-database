import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        nav: "11rem",
      },
      padding: {
        nav: "0.5rem 1rem",
      },
      fontFamily: {
        playfair: ["var(--font-playfair-display)"],
        roboto: ["var(--font-roboto)"],
        merriweather: ["var(--font-merriweather)"],
        poppins: ["var(--font-poppins)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
