import React, { useState, useEffect } from 'react';
import fotoPerfil from '../assets/perfil.jpeg';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
  const { language, toggleLanguage, texts } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={fotoPerfil} alt="Nahuel Rolón" className="profile-img" />
        <h2 className="profile-name">Nahuel Rolón</h2>
        
        {/* ANIMACIÓN 3D: El Rol cambia al girar */}
        <div key={`role-${language}`} className="flip-animate">
            <p className="profile-role">{texts.role}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* ANIMACIÓN 3D: Cada link gira individualmente */}
        <a href="#sobre-mi" key={`about-${language}`} className="flip-animate">
            {texts.menu.about}
        </a>
        <a href="#proyectos" key={`proj-${language}`} className="flip-animate">
            {texts.menu.projects}
        </a>
        <a href="#contacto" key={`contact-${language}`} className="flip-animate">
            {texts.menu.contact}
        </a>
      </nav>

      {/* --- ZONA DE CONTROLES (Lado a Lado) --- */}
      <div style={{ 
        marginTop: 'auto', 
        display: 'flex', 
        flexDirection: 'row',
        gap: '1.5rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* 1. SWITCH TEMA (Sol/Luna) */}
        <div 
          className={`theme-switch-container ${darkMode ? 'dark' : 'light'}`} 
          onClick={toggleTheme}
          title={texts.theme[darkMode ? 'dark' : 'light']}
        >
          <div className="theme-switch-slider">
             <svg className="theme-icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
             <svg className="theme-icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </div>
        </div>

        {/* 2. SWITCH IDIOMA (ES/EN) */}
        <div 
          className={`theme-switch-container ${language === 'en' ? 'dark' : 'light'}`} 
          onClick={toggleLanguage}
          title="Cambiar idioma / Change language"
        >
          <div className="theme-switch-slider">
             <span className="lang-text es-text">ES</span>
             <span className="lang-text en-text">EN</span>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;