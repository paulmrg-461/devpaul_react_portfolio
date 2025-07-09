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