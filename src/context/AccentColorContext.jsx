import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const AccentColorContext = createContext();

export const AccentColorProvider = ({ children }) => {
  const { profile } = useAuth();
  const [accentColor, setAccentColor] = useState('#C4FF0D'); // Default

  // ✅ ÚNICO lugar onde aplicamos a cor
  useEffect(() => {
    const color = profile?.accent_color || '#C4FF0D';
    setAccentColor(color);

    // Aplicar APENAS ao root (Tailwind pega automaticamente via var(--primary-color))
    document.documentElement.style.setProperty('--primary-color', color);

    // Calcular RGB UMA vez para glow effects
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
  }, [profile?.accent_color]);

  return (
    <AccentColorContext.Provider value={{ accentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};

export const useAccentColor = () => {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error('useAccentColor must be used within AccentColorProvider');
  }
  return context;
};
