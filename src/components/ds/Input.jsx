// src/components/ds/Input.jsx
import React from 'react';
import './Input.css'; // Will create this CSS file

const Input = ({ label, id, type = 'text', value, onChange, placeholder, error, ...props }) => {
  return (
    <div className="ds-input-group">
      {label && <label htmlFor={id} className="ds-label">{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`ds-input ${error ? 'ds-input--error' : ''}`}
        {...props}
      />
      {error && <p className="ds-input-error-message">{error}</p>}
    </div>
  );
};

export default Input;
