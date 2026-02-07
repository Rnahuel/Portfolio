// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import Projects from './components/Projects'; 
import About from './components/About'; 
import { useLanguage } from './context/LanguageContext'; // <--- 1. Importar el hook

function App() {
  const { texts } = useLanguage(); // <--- 2. Obtener los textos traducidos

  return (
    <div className="layout">
      {/* 1. La barra lateral fija */}
      <Sidebar />

      {/* 2. El contenido principal scrolleable */}
      <main className="main-content">
        
        {/* Sección 1: Sobre Mí */}
        <Section id="sobre-mi" title={texts.menu.about}> {/* <--- Usar variable */}
          <About />
        </Section>

        {/* Sección 2: Proyectos */}
        <Section id="proyectos" title={texts.menu.projects}> {/* <--- Usar variable */}
           <Projects /> 
        </Section>

        {/* Sección 3: Contacto */}
        <Section id="contacto" title={texts.menu.contact}> {/* <--- Usar variable */}
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
             <p style={{ marginBottom: '10px' }}>Email: rolonnahuela@outlook.com</p>
             <p>LinkedIn: /in/nahuelrolon</p>
          </div>
        </Section>

      </main>
    </div>
  );
}

export default App;