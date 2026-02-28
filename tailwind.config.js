/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0F19",
        charcoal: "#121826",
        accent: "#2563EB",
        accent2: "#3B82F6",
        text: "#E5E7EB",
        muted: "#9CA3AF"
      }
    }
  },
  plugins: []
};