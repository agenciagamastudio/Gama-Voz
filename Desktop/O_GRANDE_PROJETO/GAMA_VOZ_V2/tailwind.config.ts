import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gama Design System v1.0.0
        'gama-primary': '#88CE11',
        'gama-primary-dark': '#6BA80E',
        'gama-dark': '#161616',
        'gama-surface': '#272727',
        'gama-surface-accent': '#333333',
        'gama-border': '#52525B',
        'gama-text': '#FFFFFF',
        'gama-text-secondary': '#A1A1AA',
        'gama-success': '#10B981',
        'gama-warning': '#F59E0B',
        'gama-error': '#E11D48',
        'gama-info': '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
