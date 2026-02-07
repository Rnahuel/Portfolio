// src/components/Projects.jsx
import React from 'react';
import { projectsDB } from '../backend/db';
import { useLanguage } from '../context/LanguageContext'; // <--- IMPORTAR ESTO

const Projects = () => {
  const { language, texts } = useLanguage(); // <--- TRAER EL IDIOMA ACTUAL ('es' o 'en')
  
  const laborales = projectsDB.filter(p => p.category === 'laboral');
  const personales = projectsDB.filter(p => p.category === 'personal');

  // Traducimos los títulos de las secciones usando el diccionario del contexto
  // (O podés hardcodearlos así: language === 'es' ? 'Exp. Laboral' : 'Work Exp.')
  const titleLaboral = language === 'es' ? 'Experiencia Laboral' : 'Work Experience';
  const titlePersonal = language === 'es' ? 'Proyectos Personales' : 'Personal Projects';

  return (
    <div className="projects-container">

      {/* --- COLUMNA LABORAL --- */}
      <div className="projects-column">
        <h3 className="category-title">{titleLaboral}</h3>
        {laborales.map((project) => (
          <div key={project.id} className="project-card">
            
            {/* AQUÍ ESTABA EL ERROR: Antes era {project.title}, ahora es: */}
            <h4>{project.title[language]}</h4>
            
            <p>{project.description[language]}</p>
            
            <div className="card-stack">
              <p>{project.details[language]}</p>
              <div className="stack-highlight">Stack: {project.techStack}</div>
            </div>
          </div>
        ))}
      </div>

      {/* --- COLUMNA PERSONAL --- */}
      <div className="projects-column">
        <h3 className="category-title">{titlePersonal}</h3>
        {personales.map((project) => (
          <div key={project.id} className="project-card">
            
            <h4>{project.title[language]}</h4>
            <p>{project.description[language]}</p>
            
            <div className="card-stack">
              <p>{project.details[language]}</p>
              <div className="stack-highlight">Stack: {project.techStack}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Projects;