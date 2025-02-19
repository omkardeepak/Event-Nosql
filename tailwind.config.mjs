/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scaleUp: 'scaleUp 2s ease-out forwards',
      },
      colors: {
        background: "var(--background)", // Custom background color using CSS variables
        foreground: "var(--foreground)",
        'white-light':'#FFFFFF30', // Custom foreground color using CSS variables
      },
    },
  },
  plugins: [],
};
