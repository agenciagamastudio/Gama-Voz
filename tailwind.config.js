/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GAMA Design System Colors (Official 2026)
        'primary': '#88CE11',
        'primary-disabled': 'rgba(136, 206, 17, 0.5)',
        'gama-primary': '#88CE11',
        'gama-dark': '#161616',
        'gama-darker': '#0A0A0A',
        'gama-surface': '#272727',
        'gama-surface-accent': 'rgba(255, 255, 255, 0.05)',
        'gama-text': '#FFFFFF',
        'gama-text-secondary': '#A1A1AA',
        'gama-text-tertiary': '#71717A',
        'gama-text-muted': '#52525B',
        'gama-success': '#10B981',
        'gama-warning': '#F59E0B',
        'gama-error': '#E11D48',
        'gama-info': '#3B82F6',
        'gama-border-default': 'rgba(255, 255, 255, 0.1)',
        'gama-border-hover': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.2', fontWeight: '900', letterSpacing: '-0.5px' }],
        '3xl': ['36px', { lineHeight: '1.25', fontWeight: '800', letterSpacing: '-0.25px' }],
        '2xl': ['24px', { lineHeight: '1.33', fontWeight: '700', letterSpacing: '0px' }],
        xl: ['20px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0px' }],
        base: ['16px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0px' }],
        sm: ['14px', { lineHeight: '1.43', fontWeight: '400', letterSpacing: '0.25px' }],
        xs: ['12px', { lineHeight: '1.33', fontWeight: '400', letterSpacing: '0.5px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
        md: '0 4px 12px rgba(0, 0, 0, 0.3)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
      },
      transitionDuration: {
        fast: '150ms',
        standard: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
}