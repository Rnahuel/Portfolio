// src/components/Section.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Section = ({ id, title, children }) => {
  const { language } = useLanguage();

  const sectionStyle = {
    minHeight: '100vh',
    padding: '4rem 2rem',
    borderBottom: '1px solid rgba(128, 128, 128, 0.1)', // Borde muy sutil
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',     // Centrado horizontal
    textAlign: 'center'
  };

  return (
    <section id={id} style={sectionStyle}>
      
      {/* Contenedor con margen automático para asegurar el centro */}
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* TÍTULO: El h2 se queda quieto como bloque */}
        <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '3rem', 
            textTransform: 'uppercase',
            color: 'var(--text-main)' 
        }}>
          {/* SPAN INTERNO: Este es el que gira 360 al cambiar idioma */}
          <span 
            key={`${title}-${language}`} 
            className="flip-animate" 
            style={{ display: 'inline-block' }} // Necesario para que gire
          >
            {title}
          </span>
        </h2>

        <div className="section-content" >
          {children} 
        </div>

      </div>
    </section>
  );
};

export default Section;