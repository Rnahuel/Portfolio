import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsDB } from '../backend/db';
import { useLanguage } from '../context/LanguageContext';

const MarqueeColumn = ({ title, projects, language, navigate }) => {
  const duplicatedProjects = [...projects, ...projects];
  const trackRef = useRef(null);
  const exactScroll = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId;

    if (trackRef.current) {
      exactScroll.current = trackRef.current.scrollTop;
    }

    const scrollLoop = () => {
      if (trackRef.current && !isHovered) {
        exactScroll.current += 0.3;
        trackRef.current.scrollTop = exactScroll.current;
        
        if (trackRef.current.scrollTop >= trackRef.current.scrollHeight / 2) {
          exactScroll.current = 0;
          trackRef.current.scrollTop = 0;
        }
      } else if (trackRef.current && isHovered) {
        exactScroll.current = trackRef.current.scrollTop;
      }
      
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div className="projects-column">
      <h3 className="category-title flip-animate">
        {title}
      </h3>

      <div 
        className="marquee-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="marquee-track" ref={trackRef}>
          {duplicatedProjects.map((project, index) => (
            <div 
              key={`${project.id}-${index}`} 
              className="project-card"
              onClick={() => project.isPlayable && navigate(project.route)}
              style={project.isPlayable ? { cursor: 'pointer' } : {}}
            >
              <h4 className="flip-animate">
                {project.title[language]}
              </h4>
              
              <p className="flip-animate">
                {project.description[language]}
              </p>
              
              <div className="card-stack">
                <p className="flip-animate">
                  {project.details[language]}
                </p>
                <div className="stack-highlight">Stack: {project.techStack}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const laborales = projectsDB.filter(p => p.category === 'laboral');
  const personales = projectsDB.filter(p => p.category === 'personal');

  const titleLaboral = language === 'es' ? 'Experiencia Laboral' : 'Work Experience';
  const titlePersonal = language === 'es' ? 'Proyectos Personales' : 'Personal Projects';

  return (
    <div className="projects-container">
      <MarqueeColumn 
        title={titleLaboral} 
        projects={laborales} 
        language={language} 
        navigate={navigate} 
      />
      <MarqueeColumn 
        title={titlePersonal} 
        projects={personales} 
        language={language} 
        navigate={navigate} 
      />
    </div>
  );
};

export default Projects;