import { Project, Service, Skill } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
    image: 'https://images.pexels.com/photos/shopping-cart-on-gray-surface-3739975.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/devpaul/ecommerce',
    category: 'fullstack'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    image: 'https://images.pexels.com/photos/7014340/pexels-photo-7014340.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/devpaul/taskmanager',
    category: 'web'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with location-based forecasts',
    image: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/devpaul/weather-dashboard',
    category: 'web'
  },
  {
    id: '4',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    image: 'https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React Native', 'Redux', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/devpaul/mobile-banking',
    category: 'mobile'
  },
  {
    id: '5',
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations and dark mode',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/devpaul/portfolio',
    category: 'web'
  },
  {
    id: '6',
    title: 'Desktop Analytics Tool',
    description: 'Cross-platform desktop application for data analytics',
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Electron', 'React', 'D3.js', 'SQLite'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/devpaul/analytics-tool',
    category: 'desktop'
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies',
    icon: 'Code',
    features: ['React, Angular, Vue, Svelte', 'Node.js & Python', 'Bases de datos', 'APIs RESTful']
  },
  {
    id: '2',
    title: 'Desarrollo Móvil',
    description: 'Apps multiplataforma para iOS, Android y Web',
    icon: 'Smartphone',
    features: ['Flutter multiplataforma', 'Web, iOS, Android', 'Apps de escritorio', 'Publicación en tiendas']
  },
  {
    id: '3',
    title: 'Sistemas Empresariales',
    description: 'CRM, facturación electrónica y gestión empresarial',
    icon: 'Building2',
    features: ['Sistemas CRM', 'Facturación electrónica', 'Gestión de inventarios', 'Reportes y analytics']
  },
  {
    id: '4',
    title: 'IA & Automatización',
    description: 'Chatbots inteligentes y automatizaciones con IA',
    icon: 'Bot',
    features: ['Chatbots con IA', 'Automatización de procesos', 'Integración OpenAI', 'WebSockets en tiempo real']
  }
];

export const skills: Skill[] = [
  // Frontend & Mobile
  { name: 'Flutter', level: 95, category: 'frontend' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Angular', level: 85, category: 'frontend' },
  { name: 'Vue.js', level: 85, category: 'frontend' },
  { name: 'Svelte', level: 80, category: 'frontend' },
  
  // Backend & Database
  { name: 'Node.js', level: 90, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  { name: 'WebSockets', level: 85, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 80, category: 'backend' },
  
  // Tools & Cloud
  { name: 'AWS', level: 75, category: 'tools' },
  { name: 'Docker', level: 80, category: 'tools' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Firebase', level: 85, category: 'tools' },
  
  // AI & Automation
  { name: 'OpenAI API', level: 85, category: 'design' },
  { name: 'Chatbots', level: 90, category: 'design' },
  { name: 'Automatización', level: 85, category: 'design' },
  { name: 'Machine Learning', level: 75, category: 'design' }
];