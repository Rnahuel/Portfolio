// src/backend/db.js
export const projectsDB = [
  {
    id: 1,
    category: 'laboral',
    // FIJATE QUE AHORA SON OBJETOS CON "es" Y "en"
    title: { 
      es: "Dashboard RRHH (ONU)", 
      en: "HR Dashboard (UN)" 
    },
    description: { 
      es: "Sistema integral de gestión de nóminas...", 
      en: "Comprehensive payroll management system..." 
    },
    details: {
      es: "Lideré la implementación de módulos...",
      en: "Led the implementation of critical modules..."
    },
    techStack: "PeopleCode, Oracle SQL, XML Publisher" // Este lo dejamos igual porque los nombres técnicos no se traducen
  },
  {
    id: 2,
    category: 'laboral',
    title: { 
      es: "Portal Corporativo", 
      en: "Corporate Portal" 
    },
    description: { 
      es: "Optimización de consultas SQL y UX...", 
      en: "SQL query optimization and UX..." 
    },
    details: {
      es: "Refactorización de legacy code...",
      en: "Legacy code refactoring..."
    },
    techStack: "Java, HTML5, JavaScript, Oracle"
  },
  // ... asegurate de hacer lo mismo con los proyectos personales ...
  {
    id: 3,
    category: 'personal',
    title: { es: "HR Management System", en: "HR Management System" },
    description: { es: "App Full Stack moderna...", en: "Modern Full Stack App..." },
    details: { es: "Sistema con autenticación JWT...", en: "System with JWT auth..." },
    techStack: "MongoDB, Express, React, Node.js (MERN)"
  },
  {
    id: 4,
    category: 'personal',
    title: { es: "Portfolio Web", en: "Web Portfolio" },
    description: { es: "Diseño minimalista...", en: "Minimalist design..." },
    details: { es: "Desarrollado con componentes...", en: "Developed with components..." },
    techStack: "React, Vite, CSS3, Flexbox"
  }
];