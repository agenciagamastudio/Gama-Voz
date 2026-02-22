/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary-color)", // Vinculado dinamicamente
        "background-light": "#0a0a0a", // Do novo design system
        "background-dark": "#0a0a0a", // Do novo design system
        "card-bg": "#121212", // Novo do design system
        "border-subtle": "rgba(196,255,13,0.1)", // Novo do design system
        
        // Brand Scale Colors from Design System (prefixed with ds- to avoid conflicts)
        "ds-brand-100": "#2d4106",
        "ds-brand-300": "#5a830b",
        "ds-brand-500": "#88CE11",
        "ds-brand-700": "#a6e63a",
        "ds-brand-900": "#cbf288",
        "ds-cyber": "#00f2ff",
        "ds-volcano": "#ff3e3e",

        // Functional Colors from Design System (prefixed with ds-)
        "ds-info": "#3B82F6",
        "ds-success": "#10B981",
        "ds-warning": "#F59E0B",
        "ds-error": "#E11D48",
      },
      fontFamily: {
        "display": ["'Space Grotesk'", "sans-serif"] // Do novo design system, substituindo Inter
      },
      borderRadius: {
        "DEFAULT": "0.75rem", // Do novo design system
        "lg": "0.75rem", // Do novo design system
        "xl": "1rem", // Do novo design system
        "full": "9999px" // Do novo design system
      },
    },
  },
  plugins: [],
}