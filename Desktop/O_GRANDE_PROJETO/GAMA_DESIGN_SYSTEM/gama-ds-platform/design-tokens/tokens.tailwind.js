/**
 * GAMA Design System — Tailwind CSS Configuration
 * Generated: 2026-03-11
 * Source: tokens.yaml (Single Source of Truth)
 *
 * Use this in tailwind.config.ts:
 * import tokens from './design-tokens/tokens.tailwind.js'
 *
 * export default {
 *   theme: {
 *     extend: tokens
 *   }
 * }
 */

module.exports = {
  colors: {
    /* Core Primitives */
    core: {
      black: '#0A0A0A',
      dark: '#161616',
      surface: '#272727',
      'gray-secondary': '#A1A1AA',
      'gray-tertiary': '#71717A',
      'gray-muted': '#52525B',
      white: '#FFFFFF',
      'brand-green': '#88CE11',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#E11D48',
      info: '#3B82F6',
    },

    /* Semantic Aliases */
    primary: '#88CE11',
    'primary-hover': 'rgba(136, 206, 17, 0.9)',
    'primary-disabled': 'rgba(136, 206, 17, 0.5)',

    background: {
      primary: '#161616',
      secondary: '#0A0A0A',
    },

    surface: {
      default: '#272727',
      hover: 'rgba(255, 255, 255, 0.05)',
    },

    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      tertiary: '#71717A',
      muted: '#52525B',
    },

    success: '#10B981',
    warning: '#F59E0B',
    error: '#E11D48',
    info: '#3B82F6',

    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.2)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',

    /* Semantic */
    micro: '4px',
    compact: '8px',
    tight: '12px',
    default: '16px',
    comfortable: '24px',
    generous: '32px',
    spacious: '48px',
  },

  fontSize: {
    display: ['48px', { lineHeight: '1.2', fontWeight: '900' }],
    '3xl': ['36px', { lineHeight: '1.25', fontWeight: '800' }],
    '2xl': ['24px', { lineHeight: '1.33', fontWeight: '700' }],
    xl: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
    base: ['16px', { lineHeight: '1.5', fontWeight: '500' }],
    sm: ['14px', { lineHeight: '1.43', fontWeight: '400' }],
    xs: ['12px', { lineHeight: '1.33', fontWeight: '400' }],
  },

  fontFamily: {
    primary: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
    code: ['JetBrains Mono', 'Courier New', 'monospace'],
    sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Courier New', 'monospace'],
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeight: {
    tight: '1.2',
    snug: '1.25',
    normal: '1.33',
    relaxed: '1.4',
    loose: '1.5',
    'extra-loose': '1.6',
  },

  letterSpacing: {
    tight: '-0.5px',
    normal: '0px',
    wide: '0.25px',
    'extra-wide': '0.5px',
  },

  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    none: '0',
    full: '9999px',
  },

  boxShadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
    none: 'none',
  },

  transitionDuration: {
    fast: '150ms',
    standard: '300ms',
    slow: '500ms',
  },

  transitionTimingFunction: {
    default: 'ease-in-out',
  },

  /* Component Classes (use with @apply in CSS) */
  extend: {
    components: {
      /* Button Presets */
      '.btn': {
        '@apply': 'inline-flex items-center justify-center font-bold border-none rounded-md transition-all cursor-pointer',
      },
      '.btn-primary': {
        '@apply': 'btn bg-primary text-black hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed',
      },
      '.btn-secondary': {
        '@apply': 'btn bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
      },
      '.btn-tertiary': {
        '@apply': 'btn bg-transparent text-text-secondary hover:text-text-primary',
      },

      /* Card Presets */
      '.card': {
        '@apply': 'bg-surface-default border border-border-default rounded-lg p-2xl shadow-md transition-all hover:shadow-lg',
      },

      /* Form Elements */
      '.input': {
        '@apply': 'bg-surface-default border border-border-default rounded-sm px-lg py-md text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
      },
      '.label': {
        '@apply': 'text-sm text-text-secondary font-medium mb-sm block',
      },
    },
  },
};
