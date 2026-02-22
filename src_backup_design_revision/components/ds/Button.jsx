// src/components/ds/Button.jsx
import React from 'react';
import './Button.css'; // Will create this CSS file

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'medium', disabled = false, ...props }) => {
  const classes = `ds-button ds-button--${variant} ds-button--${size}`;
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
