// src/components/Section.jsx
import React from 'react';

// Recibe 'children' (el contenido), 'id' (para el link) y 'title'
const Section = ({ id, title, children }) => {
  const sectionStyle = {
    minHeight: '100vh', // Cada sección ocupa al menos toda la pantalla
    padding: '4rem',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra los "bloques" (divs, imgs) horizontalmente
    textAlign: 'center'
  };

  return (
    <section id={id} style={sectionStyle}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
        {title}
      </h2>
      <div className="section-content">
        {children} 
      </div>
    </section>
  );
};

export default Section;