/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#081521",
        charcoal: "#0D1525",
        accent: "#2563EB",
        accent2: "#3B82F6",
        text: "#F8FAFC",
        muted: "#A6B0C0"
      }
    }
  },
  plugins: []
};
