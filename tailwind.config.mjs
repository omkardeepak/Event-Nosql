/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zenDots: ['"Zen Dots"', 'sans-serif'],
        Rajdhani: ['"Rajdhani"', 'sans-serif'],
        Orbitron: ['"Orbitron"', 'sans-serif'],
        Goldman:['"Goldman"', 'sans-serif'],
        RacingSansOne:['"Racing Sans One"', 'serif'],
        Fb: ['Formulab', 'sans-serif'],
        Fn: ['Formulan', 'sans-serif'],
        Fw: ['Formulaw', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
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
        'cream':'#F4E9BE',
        'lightblue':'#5FA09D',
        'darkblue':'#055254',
      },
    },
  },
  plugins: [],
};
