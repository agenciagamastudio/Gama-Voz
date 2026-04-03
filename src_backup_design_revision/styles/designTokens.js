// src/styles/designTokens.js

// Colors
export const colors = {
  primary: '#007bff', // Blue
  secondary: '#6c757d', // Gray
  success: '#28a745', // Green
  danger: '#dc3545', // Red
  warning: '#ffc107', // Yellow
  info: '#17a2b8', // Cyan
  light: '#f8f9fa', // Light gray
  dark: '#343a40', // Dark gray
  white: '#ffffff',
  black: '#000000',
  text: '#212529', // Dark text
  background: '#ffffff',
  border: '#ccc',
};

// Typography
export const typography = {
  fontFamily: 'Arial, sans-serif',
  fontSize: {
    small: '0.875rem', // 14px
    base: '1rem',      // 16px
    medium: '1.125rem',// 18px
    large: '1.25rem',  // 20px
    h1: '2.5rem',      // 40px
    h2: '2rem',        // 32px
    h3: '1.75rem',     // 28px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    base: 1.5,
    heading: 1.2,
  },
};

// Spacing
export const spacing = {
  none: '0',
  xxs: '0.25rem', // 4px
  xs: '0.5rem',  // 8px
  sm: '0.75rem', // 12px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  xxl: '3rem',   // 48px
};

// Shadows
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

// Breakpoints (for responsive design, if needed later)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
