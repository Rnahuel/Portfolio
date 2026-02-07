// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const LanguageContext = createContext();

// Proveedor del contexto (el componente que envuelve a la app)
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Por defecto español

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  // Diccionario de textos fijos (Menú, Títulos, etc.)
  const translations = {
    es: {
      role: "Desarrollador Full Stack",
      menu: { about: "SOBRE MÍ", projects: "PROYECTOS", contact: "CONTACTO" },
      theme: { dark: "Modo Oscuro", light: "Modo Claro" }
    },
    en: {
      role: "Full Stack Developer",
      menu: { about: "ABOUT ME", projects: "PROJECTS", contact: "CONTACT" },
      theme: { dark: "Dark Mode", light: "Light Mode" }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, texts: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el idioma fácil
export const useLanguage = () => useContext(LanguageContext);