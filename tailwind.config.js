/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sera-cream": "#F4F1EA", // The base "paper" texture color
        "sera-stone": "#CDCBC4", // Subtle borders/accents
        "sera-charcoal": "#1C1C1C", // Primary text (softer than black)
        "sera-red": "#B93627", // The chili/appetite accent
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Clean UI text
        serif: ["Playfair Display", "serif"], // Editorial Headings (Import this in CSS!)
      },
      height: {
        "screen-150": "150vh", // Useful for parallax spacers
      },
    },
  },
  plugins: [],
};
