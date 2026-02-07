// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import Projects from './components/Projects'; 
import About from './components/About'; 
function App() {
  return (
    <div className="layout">
      {/* 1. La barra lateral fija */}
      <Sidebar />

      {/* 2. El contenido principal scrolleable */}
      <main className="main-content">
        
        {/* Sección 1: Sobre Mi */}
        <Section id="sobre-mi" title="Sobre Mí">
          <About />
        </Section>

        {/* Sección 2: Proyectos */}
        <Section id="proyectos" title="Proyectos">
           {/* Aquí podrías llamar a tu componente de Proyectos */}
           <Projects /> 
        </Section>

        {/* Sección 3: Contacto */}
        <Section id="contacto" title="Contacto">
          <p>Email: rolonnahuela@outlook.com</p>
          <p>LinkedIn: /in/nahuelrolon</p>
        </Section>

      </main>
    </div>
  );
}

export default App;