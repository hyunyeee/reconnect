module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        "main-pink": "var(--color-main-pink)",
      },
    },
  },
  darkMode: "media",
  plugins: ["tailwindcss-animate"],
};
