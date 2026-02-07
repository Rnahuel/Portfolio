// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import fotoPerfil from '../assets/perfil.jpeg'; 

const Sidebar = () => {
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
        <p className="profile-role">Full Stack Developer</p>
      </div>

      <nav className="sidebar-nav">
        <a href="#sobre-mi">SOBRE MI</a>
        <a href="#proyectos">PROYECTOS</a>
        <a href="#contacto">CONTACTO</a>
      </nav>

      {/* --- INTERRUPTOR DESLIZANTE (Toggle Switch) --- */}
      <div 
        className={`theme-switch-container ${darkMode ? 'dark' : 'light'}`} 
        onClick={toggleTheme}
        style={{ marginTop: 'auto' }} // Empuja al fondo
      >
        <div className="theme-switch-slider">
          {/* Icono del SOL */}
          <svg 
            className="theme-icon sun-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>

          {/* Icono de la LUNA */}
          <svg 
            className="theme-icon moon-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;