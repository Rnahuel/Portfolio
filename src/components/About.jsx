// src/components/About.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // <--- Importamos el contexto

const About = () => {
  const { language } = useLanguage(); // Obtenemos 'es' o 'en'

  // Definimos los textos para ambos idiomas
  const content = {
    es: {
      p1: <>¡Hola! Soy Nahuel, <strong>Desarrollador de Software</strong>.</>,
      p2: <>Me formé en la <strong>UNLaM</strong> como Técnico en Desarrollo Web y trabajando como Desarrollador de Software en ABTIO para clientes como <strong>ONU, Gideon Tailor, BCRA</strong> entre otros. Donde comprendí que invertir tiempo en buenas prácticas hoy, ahorra deuda técnica y bugs mañana.</>,
      p3: <>Pero mi lugar en el mundo es la Web. Hoy uso esa base técnica sólida para construir aplicaciones modernas con el Stack MERN. Me gusta el desafío de crear cosas nuevas y seguir aprendiendo tecnologías todos los días.</>
    },
    en: {
      p1: <>Hello! I'm Nahuel, a <strong>Software Developer</strong>.</>,
      p2: <>I trained at <strong>UNLaM</strong> as a Web Development Technician and worked as a Software Developer at ABTIO for clients such as <strong>ONU, Gideon Tailor, BCRA</strong>, among others. There, I understood that investing time in best practices today saves technical debt and bugs tomorrow.</>,
      p3: <>But my place in the world is the Web. Today I use that solid technical foundation to build modern applications with the MERN Stack. I love the challenge of creating new things and keep learning technologies every day.</>
    }
  };

  // Seleccionamos el texto según el idioma actual
  const text = content[language];

  return (
    <div className="about-section">
      
      {/* Párrafo 1 */}
      <p 
        className="about-text flip-animate" 
        key={`p1-${language}`} // La llave dispara la animación al cambiar idioma
        style={{ marginBottom: '1rem' }}
      >
        {text.p1}
      </p>
      
      {/* Párrafo 2 */}
      <p 
        className="about-text flip-animate" 
        key={`p2-${language}`}
        style={{ marginBottom: '1rem' }}
      >
        {text.p2}
      </p>

      {/* Párrafo 3 */}
      <p 
        className="about-text flip-animate" 
        key={`p3-${language}`}
        style={{ marginTop: '1rem' }}
      >
        {text.p3}
      </p>
      
    </div>
  );
};

export default About;