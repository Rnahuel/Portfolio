// src/components/Projects.jsx
import React from 'react';
import { projectsDB } from '../backend/db';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { language } = useLanguage();
  
  const laborales = projectsDB.filter(p => p.category === 'laboral');
  const personales = projectsDB.filter(p => p.category === 'personal');

  const titleLaboral = language === 'es' ? 'Experiencia Laboral' : 'Work Experience';
  const titlePersonal = language === 'es' ? 'Proyectos Personales' : 'Personal Projects';

  return (
    <div className="projects-container">

      {/* --- COLUMNA LABORAL --- */}
      <div className="projects-column">
        {/* Animamos el título de la categoría */}
        <h3 key={`cat-lab-${language}`} className="category-title flip-animate">
          {titleLaboral}
        </h3>
        
        {laborales.map((project) => (
          <div key={project.id} className="project-card">
            
            {/* TÍTULO: key única combinando ID + Idioma */}
            <h4 key={`tit-${project.id}-${language}`} className="flip-animate">
              {project.title[language]}
            </h4>
            
            {/* DESCRIPCIÓN */}
            <p key={`desc-${project.id}-${language}`} className="flip-animate">
              {project.description[language]}
            </p>
            
            <div className="card-stack">
              {/* DETALLES OCULTOS */}
              <p key={`det-${project.id}-${language}`} className="flip-animate">
                {project.details[language]}
              </p>
              {/* El stack técnico NO se traduce, así que no lleva animación */}
              <div className="stack-highlight">Stack: {project.techStack}</div>
            </div>
          </div>
        ))}
      </div>

      {/* --- COLUMNA PERSONAL --- */}
      <div className="projects-column">
        {/* Animamos el título de la categoría */}
        <h3 key={`cat-pers-${language}`} className="category-title flip-animate">
          {titlePersonal}
        </h3>

        {personales.map((project) => (
          <div key={project.id} className="project-card">
            
            <h4 key={`tit-${project.id}-${language}`} className="flip-animate">
              {project.title[language]}
            </h4>
            
            <p key={`desc-${project.id}-${language}`} className="flip-animate">
              {project.description[language]}
            </p>
            
            <div className="card-stack">
              <p key={`det-${project.id}-${language}`} className="flip-animate">
                {project.details[language]}
              </p>
              <div className="stack-highlight">Stack: {project.techStack}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Projects;