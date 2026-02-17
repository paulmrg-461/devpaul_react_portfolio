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
    'hero.chatTitle': 'DevPaul Bot',
    'hero.chatIntro': 'Pregúntame sobre proyectos, tecnologías, experiencia y si puedo ayudarte con tu idea.',
    'chat.inputPlaceholder': 'Escribe tu mensaje...',
    'chat.send': 'Enviar',
    'chat.thinking': 'Pensando...',
    
    // About Section
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Desarrollador apasionado con más de 7 años de experiencia creando soluciones digitales innovadoras',
    'about.description1': 'Soy un desarrollador full-stack apasionado con más de 7 años de experiencia creando soluciones digitales innovadoras y funcionales. Mi experiencia abarca desde desarrollo web y móvil hasta aplicaciones de escritorio y sistemas empresariales complejos.',
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

    // Projects
    'project.todoApp.title': 'Todo App with AI',
    'project.todoApp.description': 'Aplicación de tareas con IA integrada para gestión inteligente de pendientes.',
    'project.centralAluminios.title': 'Central de Aluminios del Valle Responsive Web page and AI Chatbot',
    'project.centralAluminios.description': 'Página web responsiva y chatbot con IA para atención al cliente.',
    'project.diegoLopez.title': 'Escuela de Conducción Diego López - App para registro y control de asistencia',
    'project.diegoLopez.description': 'App para registro y control de asistencia en escuela de conducción.',
    'project.cdaPopayan.title': 'CDA Popayan Flutter App to register vehicle checking',
    'project.cdaPopayan.description': 'App para registro de revisiones vehiculares en CDA Popayán.',
    'project.codigoTransito.title': 'App Flutter de Código de Tránsito OpenAI Fine Tuned',
    'project.codigoTransito.description': 'App de código de tránsito con IA afinada en la Ley 769 de 2002 de Colombia.',
    'project.devpaulLoans.title': 'DevPaul Flutter Loans App',
    'project.devpaulLoans.description': 'App para gestión de préstamos.',
    'project.schoolManager.title': 'School Manager Flutter App',
    'project.schoolManager.description': 'App para gestión de notas de estudiantes y certificados.',
    'project.deliveries.title': 'Aplicación de deliveries para restaurante',
    'project.deliveries.description': 'App para gestión de pedidos y trazado de rutas en restaurante.',
    'project.grupoVista.title': 'Aplicación para gestión de consultoría empresa Grupo Vista',
    'project.grupoVista.description': 'App para gestión de citas, chatbot con OpenAI y soporte al cliente.',
    'project.asistenciaAngular.title': 'App para control de asistencia Angular',
    'project.asistenciaAngular.description': 'App con geolocalización y soporte offline para control de asistencia.',
    'project.modware.title': 'Modware Landing Page',
    'project.modware.description': 'Landing page para Modware.',
    'project.jimmyPortfolioFlutter.title': 'Jimmy Portfolio Flutter',
    'project.jimmyPortfolioFlutter.description': 'Portafolio personal de Jimmy con Flutter.',
    'project.amorEterno.title': 'Amor Eterno Landing Page',
    'project.amorEterno.description': 'Landing page para Amor Eterno, arreglos textiles.',
    'project.naturaStay.title': 'NaturaStay Web App',
    'project.naturaStay.description': 'Web App para gestión de reservas en Natura Stay. Incluye sistema de reservas, chatbot con IA y soporte al cliente.',
    
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
    
    'clients.megahogar.name': 'MegaHogar Supermercados',
    'clients.megahogar.description': 'Desarrollo de sistema de gestión integral para cadena de supermercados, incluyendo inventarios, ventas y facturación electrónica.',
    'clients.megahogar.category': 'Retail',
    'clients.gh.name': 'Grupo Empresarial G&H SAS',
    'clients.gh.description': 'Soluciones empresariales personalizadas y sistemas de gestión para optimizar procesos internos y mejorar la productividad.',
    'clients.gh.category': 'Empresarial',
    'clients.cda.name': 'CDA Panamericana Popayán',
    'clients.cda.description': 'Sistema de gestión para centro de diagnóstico automotriz con reportes técnicos y certificaciones.',
    'clients.cda.category': 'Automotriz',
    'clients.vista.name': 'Grupo Vista SAS',
    'clients.vista.description': 'Desarrollo de plataforma web y aplicaciones móviles para servicios empresariales especializados.',
    'clients.vista.category': 'Servicios',
    'clients.comunix.name': 'Comunix',
    'clients.comunix.description': 'Soluciones tecnológicas innovadoras y desarrollo de software personalizado para comunidades digitales.',
    'clients.comunix.category': 'Tecnología',
    'clients.jirehfarma.name': 'Farmacia Jirehfarma',
    'clients.jirehfarma.description': 'Sistema de gestión farmacéutica con control de inventarios y ventas.',
    'clients.jirehfarma.category': 'Salud',
    'clients.centralAluminios.name': 'Central de Aluminios del Valle',
    'clients.centralAluminios.description': 'Desarrollo integral de sistema de gestión de inventarios, chatbot de atención personalizada, CRM de facturación e inventario y página web corporativa.',
    'clients.centralAluminios.category': 'Industrial',
    
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
    'contact.sending': 'Enviando...',
    'contact.errorSending': 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    
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
    'hero.title': 'Hi, I am Paul Realpe',
    'hero.subtitle': 'Full-Stack Developer & Software Solutions Architect',
    'hero.technologies': 'Flutter • React • Angular • Vue • Python • Node.js • AI Solutions',
    'hero.description': 'Specialized in cross-platform development and custom software solutions. I create web, mobile and desktop applications, CRM systems, electronic invoicing, AI automations and intelligent chatbots.',
    'hero.getInTouch': 'Get In Touch',
    'hero.downloadCV': 'Download CV',
    'hero.chatTitle': 'DevPaul Bot',
    'hero.chatIntro': 'Ask me about projects, technologies, experience, or how I can help with your idea.',
    'chat.inputPlaceholder': 'Type your message...',
    'chat.send': 'Send',
    'chat.thinking': 'Thinking...',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate developer with 7+ years of experience creating innovative digital solutions',
    'about.description1': 'I am a passionate full-stack developer with over 7 years of experience creating innovative and functional digital solutions. My experience spans from web and mobile development to desktop applications and complex enterprise systems.',
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

    // Projects
    'project.todoApp.title': 'Todo App with AI',
    'project.todoApp.description': 'Task management app with integrated AI for intelligent todo handling.',
    'project.centralAluminios.title': 'Central de Aluminios del Valle Responsive Web page and AI Chatbot',
    'project.centralAluminios.description': 'Responsive website and AI chatbot for customer service.',
    'project.diegoLopez.title': 'Diego Lopez Driving School - Attendance registration and control Flutter Android/Web App',
    'project.diegoLopez.description': 'App for attendance registration and control in driving school.',
    'project.cdaPopayan.title': 'CDA Popayan Flutter App to register vehicle checking',
    'project.cdaPopayan.description': 'App for registering vehicle inspections in CDA Popayán.',
    'project.codigoTransito.title': 'Flutter App for Traffic Code OpenAI Fine Tuned',
    'project.codigoTransito.description': 'Traffic code app with fine-tuned AI on Colombia\'s Law 769 of 2002.',
    'project.devpaulLoans.title': 'DevPaul Flutter Loans App',
    'project.devpaulLoans.description': 'App for loan management.',
    'project.schoolManager.title': 'School Manager Flutter App',
    'project.schoolManager.description': 'App for student grade management and certificates.',
    'project.deliveries.title': 'Restaurant Delivery Application',
    'project.deliveries.description': 'App for order management and route tracing in restaurant.',
    'project.grupoVista.title': 'Application for Grupo Vista Consulting Management',
    'project.grupoVista.description': 'App for appointment management, OpenAI chatbot and personalized customer support.',
    'project.asistenciaAngular.title': 'Angular Attendance Control App',
    'project.asistenciaAngular.description': 'App with geolocation and offline support for attendance control.',
    'project.modware.title': 'Modware Landing Page',
    'project.modware.description': 'Landing page for Modware.',
    'project.jimmyPortfolioFlutter.title': 'Jimmy Portfolio Flutter App',
    'project.jimmyPortfolioFlutter.description': 'Flutter app for Jimmy Portfolio.',
    'project.amorEterno.title': 'Amor Eterno Landing Page',
    'project.amorEterno.description': 'Landing page for Amor Eterno, arrangements of textiles.',
    'project.naturaStay.title': 'NaturaStay Web App',
    'project.naturaStay.description': 'Web App for gesture of reservations in Natura Stay. Includes reservation system, chatbot with IA and customer support.',
    
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
    'clients.subtitle': 'I have had the privilege of working with leading companies across different sectors, developing technological solutions that drive their growth',
    'clients.trustedBy': 'Companies that trust DevPaul',
    
    'clients.megahogar.name': 'MegaHogar Supermercados',
    'clients.megahogar.description': 'Development of comprehensive management system for supermarket chain, including inventory, sales and electronic invoicing.',
    'clients.megahogar.category': 'Retail',
    'clients.gh.name': 'Grupo Empresarial G&H SAS',
    'clients.gh.description': 'Custom enterprise solutions and management systems to optimize internal processes and improve productivity.',
    'clients.gh.category': 'Business',
    'clients.cda.name': 'CDA Panamericana Popayán',
    'clients.cda.description': 'Management system for automotive diagnostic center with technical reports and certifications.',
    'clients.cda.category': 'Automotive',
    'clients.vista.name': 'Grupo Vista SAS',
    'clients.vista.description': 'Development of web platform and mobile applications for specialized business services.',
    'clients.vista.category': 'Services',
    'clients.comunix.name': 'Comunix',
    'clients.comunix.description': 'Innovative technological solutions and custom software development for digital communities.',
    'clients.comunix.category': 'Technology',
    'clients.jirehfarma.name': 'Farmacia Jirehfarma',
    'clients.jirehfarma.description': 'Pharmaceutical management system with inventory control and sales.',
    'clients.jirehfarma.category': 'Health',
    'clients.centralAluminios.name': 'Central de Aluminios del Valle',
    'clients.centralAluminios.description': 'Comprehensive development of inventory management system, personalized customer service chatbot, invoicing and inventory CRM, and corporate website.',
    'clients.centralAluminios.category': 'Industrial',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to start your next project? Let us work together to create something amazing.',
    'contact.letsConnect': 'Let us Connect',
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
    'contact.thankYou': 'Thank you for your message! I will get back to you soon.',
    'contact.sending': 'Sending...',
    'contact.errorSending': 'Error sending message. Please try again.',
    
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
