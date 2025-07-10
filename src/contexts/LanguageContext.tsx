import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.portfolio': 'Portafolio',
    'nav.services': 'Servicios',
    'nav.clients': 'Clientes',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Hola, soy Paul Realpe',
    'hero.subtitle': 'Desarrollador Full-Stack y Arquitecto de Soluciones de Software',
    'hero.technologies': 'Flutter • React • Angular • Vue • Python • Node.js • Soluciones IA',
    'hero.description': 'Especializado en desarrollo multiplataforma y soluciones de software personalizadas. Creo aplicaciones web, móviles y de escritorio, sistemas CRM, facturación electrónica, automatizaciones con IA y chatbots inteligentes.',
    'hero.getInTouch': 'Contáctame',
    'hero.downloadCV': 'Descargar CV',
    
    // About Section
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Desarrollador apasionado con más de 5 años de experiencia creando soluciones digitales innovadoras',
    'about.description1': 'Soy un desarrollador full-stack apasionado con más de 5 años de experiencia creando soluciones digitales innovadoras y funcionales. Mi experiencia abarca desde desarrollo web y móvil hasta aplicaciones de escritorio y sistemas empresariales complejos.',
    'about.description2': 'Me especializo en tecnologías modernas como Flutter, React, Angular, Vue, Svelte, Python y Node.js. Mi enfoque combina experiencia técnica con resolución creativa de problemas para entregar soluciones que no solo funcionan perfectamente, sino que también brindan experiencias excepcionales.',
    'about.description3': 'Ofrezco soluciones completas de software incluyendo aplicaciones web, móviles, de escritorio, sistemas CRM, facturación electrónica, automatizaciones con IA y chatbots inteligentes.',
    'about.projectsCompleted': 'Proyectos Completados',
    'about.yearsExperience': 'Años de Experiencia',
    'about.skillsTitle': 'Habilidades y Tecnologías',
    'about.frontendMobile': 'Frontend y Móvil',
    'about.backendDatabase': 'Backend y Base de Datos',
    'about.toolsCloud': 'Herramientas y Cloud',
    'about.aiAutomation': 'IA y Automatización',
    
    // Portfolio Section
    'portfolio.title': 'Mi Portafolio',
    'portfolio.subtitle': 'Una colección de proyectos que demuestran mis habilidades y pasión por crear experiencias digitales increíbles',
    'portfolio.allProjects': 'Todos los Proyectos',
    'portfolio.webApps': 'Aplicaciones Web',
    'portfolio.mobileApps': 'Apps Móviles',
    'portfolio.fullStack': 'Full Stack',
    'portfolio.desktopApps': 'Apps de Escritorio',
    
    // Services Section
    'services.title': 'Mis Servicios',
    'services.subtitle': 'Ofrezco servicios integrales de desarrollo para dar vida a tus ideas con tecnologías modernas',
    
    // Services Details
    'services.webDev.title': 'Desarrollo Web',
    'services.webDev.description': 'Aplicaciones web personalizadas con tecnologías modernas',
    'services.webDev.feature1': 'React, Angular, Vue, Svelte',
    'services.webDev.feature2': 'Node.js & Python',
    'services.webDev.feature3': 'Bases de datos',
    'services.webDev.feature4': 'APIs RESTful',
    
    'services.mobileDev.title': 'Desarrollo Móvil',
    'services.mobileDev.description': 'Apps multiplataforma para iOS, Android y Web',
    'services.mobileDev.feature1': 'Flutter multiplataforma',
    'services.mobileDev.feature2': 'Web, iOS, Android',
    'services.mobileDev.feature3': 'Apps de escritorio',
    'services.mobileDev.feature4': 'Publicación en tiendas',
    
    'services.enterprise.title': 'Sistemas Empresariales',
    'services.enterprise.description': 'CRM, facturación electrónica y gestión empresarial',
    'services.enterprise.feature1': 'Sistemas CRM',
    'services.enterprise.feature2': 'Facturación electrónica',
    'services.enterprise.feature3': 'Gestión de inventarios',
    'services.enterprise.feature4': 'Reportes y analytics',
    
    'services.aiAutomation.title': 'IA & Automatización',
    'services.aiAutomation.description': 'Chatbots inteligentes y automatizaciones con IA',
    'services.aiAutomation.feature1': 'Chatbots con IA',
    'services.aiAutomation.feature2': 'Automatización de procesos',
    'services.aiAutomation.feature3': 'Integración OpenAI',
    'services.aiAutomation.feature4': 'WebSockets en tiempo real',
    
    // Clients Section
    'clients.title': 'Clientes que Confían en Mí',
    'clients.subtitle': 'He tenido el privilegio de trabajar con empresas líderes en diferentes sectores, desarrollando soluciones tecnológicas que impulsan su crecimiento',
    'clients.trustedBy': 'Empresas que confían en DevPaul',
    
    'clients.megahogar.description': 'Desarrollo de sistema de gestión integral para cadena de supermercados, incluyendo inventarios, ventas y facturación electrónica.',
    'clients.gh.description': 'Soluciones empresariales personalizadas y sistemas de gestión para optimizar procesos internos y mejorar la productividad.',
    'clients.cda.description': 'Sistema de gestión para centro de diagnóstico automotriz con control de citas, reportes técnicos y certificaciones.',
    'clients.vista.description': 'Desarrollo de plataforma web y aplicaciones móviles para servicios empresariales especializados.',
    'clients.comunix.description': 'Soluciones tecnológicas innovadoras y desarrollo de software personalizado para comunidades digitales.',
    'clients.jirehfarma.description': 'Sistema de gestión farmacéutica con control de inventarios, ventas y cumplimiento de normativas sanitarias.',
    
    // Contact Section
    'contact.title': 'Contáctame',
    'contact.subtitle': '¿Listo para comenzar tu próximo proyecto? Trabajemos juntos para crear algo increíble.',
    'contact.letsConnect': 'Conectemos',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.sendMessage': 'Enviar Mensaje',
    'contact.nameRequired': 'El nombre es requerido',
    'contact.emailRequired': 'El email es requerido',
    'contact.emailInvalid': 'Dirección de email inválida',
    'contact.subjectRequired': 'El asunto es requerido',
    'contact.messageRequired': 'El mensaje es requerido',
    'contact.namePlaceholder': 'Tu nombre',
    'contact.emailPlaceholder': 'tu@email.com',
    'contact.subjectPlaceholder': 'Discusión de proyecto',
    'contact.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
    'contact.thankYou': '¡Gracias por tu mensaje! Te responderé pronto.',
    
    // Footer
    'footer.madeWith': 'Hecho con',
    'footer.by': 'por Paul Realpe',
    'footer.rights': '© 2024 DevPaul. Todos los derechos reservados.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.clients': 'Clients',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Hi, I\'m Paul Realpe',
    'hero.subtitle': 'Full-Stack Developer & Software Solutions Architect',
    'hero.technologies': 'Flutter • React • Angular • Vue • Python • Node.js • AI Solutions',
    'hero.description': 'Specialized in cross-platform development and custom software solutions. I create web, mobile and desktop applications, CRM systems, electronic invoicing, AI automations and intelligent chatbots.',
    'hero.getInTouch': 'Get In Touch',
    'hero.downloadCV': 'Download CV',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate developer with 5+ years of experience creating innovative digital solutions',
    'about.description1': 'I\'m a passionate full-stack developer with over 5 years of experience creating innovative and functional digital solutions. My experience spans from web and mobile development to desktop applications and complex enterprise systems.',
    'about.description2': 'I specialize in modern technologies like Flutter, React, Angular, Vue, Svelte, Python and Node.js. My approach combines technical expertise with creative problem-solving to deliver solutions that not only work perfectly but also provide exceptional experiences.',
    'about.description3': 'I offer complete software solutions including web, mobile, desktop applications, CRM systems, electronic invoicing, AI automations and intelligent chatbots.',
    'about.projectsCompleted': 'Projects Completed',
    'about.yearsExperience': 'Years Experience',
    'about.skillsTitle': 'Skills & Technologies',
    'about.frontendMobile': 'Frontend & Mobile',
    'about.backendDatabase': 'Backend & Database',
    'about.toolsCloud': 'Tools & Cloud',
    'about.aiAutomation': 'AI & Automation',
    
    // Portfolio Section
    'portfolio.title': 'My Portfolio',
    'portfolio.subtitle': 'A collection of projects that showcase my skills and passion for creating amazing digital experiences',
    'portfolio.allProjects': 'All Projects',
    'portfolio.webApps': 'Web Apps',
    'portfolio.mobileApps': 'Mobile Apps',
    'portfolio.fullStack': 'Full Stack',
    'portfolio.desktopApps': 'Desktop Apps',
    
    // Services Section
    'services.title': 'My Services',
    'services.subtitle': 'I offer comprehensive development services to bring your ideas to life with modern technologies',
    
    // Services Details
    'services.webDev.title': 'Web Development',
    'services.webDev.description': 'Custom web applications built with modern technologies',
    'services.webDev.feature1': 'React, Angular, Vue, Svelte',
    'services.webDev.feature2': 'Node.js & Python',
    'services.webDev.feature3': 'Databases',
    'services.webDev.feature4': 'RESTful APIs',
    
    'services.mobileDev.title': 'Mobile Development',
    'services.mobileDev.description': 'Cross-platform apps for iOS, Android and Web',
    'services.mobileDev.feature1': 'Cross-platform Flutter',
    'services.mobileDev.feature2': 'Web, iOS, Android',
    'services.mobileDev.feature3': 'Desktop applications',
    'services.mobileDev.feature4': 'App store publishing',
    
    'services.enterprise.title': 'Enterprise Systems',
    'services.enterprise.description': 'CRM, electronic invoicing and business management',
    'services.enterprise.feature1': 'CRM Systems',
    'services.enterprise.feature2': 'Electronic invoicing',
    'services.enterprise.feature3': 'Inventory management',
    'services.enterprise.feature4': 'Reports and analytics',
    
    'services.aiAutomation.title': 'AI & Automation',
    'services.aiAutomation.description': 'Intelligent chatbots and AI automations',
    'services.aiAutomation.feature1': 'AI Chatbots',
    'services.aiAutomation.feature2': 'Process automation',
    'services.aiAutomation.feature3': 'OpenAI integration',
    'services.aiAutomation.feature4': 'Real-time WebSockets',
    
    // Clients Section
    'clients.title': 'Clients Who Trust Me',
    'clients.subtitle': 'I\'ve had the privilege of working with leading companies across different sectors, developing technological solutions that drive their growth',
    'clients.trustedBy': 'Companies that trust DevPaul',
    
    'clients.megahogar.description': 'Development of comprehensive management system for supermarket chain, including inventory, sales and electronic invoicing.',
    'clients.gh.description': 'Custom enterprise solutions and management systems to optimize internal processes and improve productivity.',
    'clients.cda.description': 'Management system for automotive diagnostic center with appointment control, technical reports and certifications.',
    'clients.vista.description': 'Development of web platform and mobile applications for specialized business services.',
    'clients.comunix.description': 'Innovative technological solutions and custom software development for digital communities.',
    'clients.jirehfarma.description': 'Pharmaceutical management system with inventory control, sales and compliance with health regulations.',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to start your next project? Let\'s work together to create something amazing.',
    'contact.letsConnect': 'Let\'s Connect',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sendMessage': 'Send Message',
    'contact.nameRequired': 'Name is required',
    'contact.emailRequired': 'Email is required',
    'contact.emailInvalid': 'Invalid email address',
    'contact.subjectRequired': 'Subject is required',
    'contact.messageRequired': 'Message is required',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.subjectPlaceholder': 'Project discussion',
    'contact.messagePlaceholder': 'Tell me about your project...',
    'contact.thankYou': 'Thank you for your message! I\'ll get back to you soon.',
    
    // Footer
    'footer.madeWith': 'Made with',
    'footer.by': 'by Paul Realpe',
    'footer.rights': '© 2024 DevPaul. All rights reserved.'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};