/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sera-cream": "#778961", // The base "paper" texture color
        "sera-stone": "#C5D89D", // Subtle borders/accents
        "sera-charcoal": "#492828", // Primary text (softer than black)
        "sera-red": "#B93627", // The chili/appetite accent
        "sera-green": "#97B067", // Primary text (softer than black)
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
