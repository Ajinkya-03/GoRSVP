/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        footertext: "var(--footertext)",
      },
      animation: {
        'bounce-fast': 'bounce 1s ease-in-out 10',
      },
    },
  },
  plugins: [],
};
