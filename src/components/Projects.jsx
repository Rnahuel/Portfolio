import React from 'react';
import { projectsDB } from '../backend/db'; // Importamos los datos

const Projects = () => {
  
  // Filtramos los datos
  const laborales = projectsDB.filter(p => p.category === 'laboral');
  const personales = projectsDB.filter(p => p.category === 'personal');

  return (
    <div className="projects-container">

      {/* --- COLUMNA LABORAL --- */}
      <div className="projects-column">
        <h3 className="category-title">Experiencia Laboral</h3>
        {laborales.map((project) => (
          <div key={project.id} className="project-card">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            
            {/* Esta parte está oculta y aparece sola con CSS al pasar el mouse */}
            <div className="card-stack">
              <p>{project.details}</p>
              <div className="stack-highlight">Stack: {project.techStack}</div>
            </div>
          </div>
        ))}
      </div>

      {/* --- COLUMNA PERSONAL --- */}
      <div className="projects-column">
        <h3 className="category-title">Proyectos Personales</h3>
        {personales.map((project) => (
          <div key={project.id} className="project-card">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            
            <div className="card-stack">
              <p>{project.details}</p>
              <div className="stack-highlight">Stack: {project.techStack}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Projects;