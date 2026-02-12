// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import Projects from './components/Projects'; 
import About from './components/About'; 
import { useLanguage } from './context/LanguageContext';
// Importamos la vista del juego (Asegúrate que la ruta sea correcta)
import Jugar from './viewJugar/Jugar'; 

// Componente que contiene tu Portfolio actual
const PortfolioLayout = () => {
  const { texts } = useLanguage();

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Section id="sobre-mi" title={texts.menu.about}>
          <About />
        </Section>
        <Section id="proyectos" title={texts.menu.projects}>
           <Projects /> 
        </Section>
        <Section id="contacto" title={texts.menu.contact}>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
             <p style={{ marginBottom: '10px' }}>Email: rolonnahuela@outlook.com</p>
             <p>LinkedIn: /in/nahuelrolon</p>
          </div>
        </Section>
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Ruta Principal: Tu Portfolio */}
      <Route path="/" element={<PortfolioLayout />} />
      
      {/* Ruta del Juego: Pantalla completa */}
      <Route path="/jugar" element={<Jugar />} />
    </Routes>
  );
}

export default App;