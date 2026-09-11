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
        muted: "#A6B0C0",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        destructive: "var(--destructive)"
      },
      borderColor: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)"
      },
      ringColor: {
        ring: "var(--ring)",
        destructive: "var(--destructive)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) * 0.8)",
        sm: "calc(var(--radius) * 0.6)",
        xl: "calc(var(--radius) * 1.4)",
        "2xl": "calc(var(--radius) * 1.8)"
      }
    }
  },
  plugins: []
};
