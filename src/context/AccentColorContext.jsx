import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const AccentColorContext = createContext();

export const AccentColorProvider = ({ children }) => {
  const { profile } = useAuth();
  const [accentColor, setAccentColor] = useState(() => {
    // Tentar pegar cor do localStorage (carregamento rápido)
    const saved = localStorage.getItem('accent-color-cache');
    return saved || '#C4FF0D';
  });

  // Declarar função ANTES dos useEffects que a usam
  const applyColor = (color) => {
    // Aplicar APENAS ao root (Tailwind pega automaticamente via var(--primary-color))
    document.documentElement.style.setProperty('--primary-color', color);

    // Calcular RGB UMA vez para glow effects
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
  };

  // ✅ Aplicar cor do localStorage IMEDIATAMENTE ao renderizar
  useEffect(() => {
    const saved = localStorage.getItem('accent-color-cache');
    if (saved) {
      applyColor(saved);
    }
  }, []);

  // ✅ Sincronizar com profile quando carregar do Supabase
  useEffect(() => {
    if (profile?.accent_color) {
      const color = profile.accent_color;
      localStorage.setItem('accent-color-cache', color);
      applyColor(color);
      // Note: não chamar setAccentColor aqui para evitar setState em effect
      // O estado é sincronizado via localStorage na inicialização
    }
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
