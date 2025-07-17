import { Project, Service, Skill, Client } from '../types';
import { Building2, ShoppingCart, Car, Eye, Users, Pill } from 'lucide-react';

const projectData = [
  {
    id: '1',
    slug: 'todoApp',
    image: '/portfolio/DevPaulToDo.png',
    technologies: ['Flutter', 'N8N', 'Deepseek', 'Vectorial postgres'],
    liveUrl: 'https://devpaultodo.web.app',
    githubUrl: 'https://github.com/paulmrg-461/devpaul_todo_app',
    category: 'fullstack'
  },
  {
    id: '2',
    slug: 'centralAluminios',
    image: '/portfolio/CentralAluminios.png',
    technologies: ['React', 'n8n', 'FastAPI', 'Deepseek'],
    liveUrl: 'https://centraldealuminiosdelvalle.com',
    githubUrl: 'https://github.com/devpaul/central-aluminios',
    category: 'web'
  },
  {
    id: '3',
    slug: 'modware',
    image: '/portfolio/ModWareLanding.png',
    technologies: ['ReactJS'],
    liveUrl: 'https://modware.lat',
    githubUrl: 'https://github.com/paulmrg-461/react_modware_landing',
    category: 'web'
  },
  {
    id: '4',
    slug: 'codigoTransito',
    image: '/portfolio/TransitoApp.png',
    technologies: ['Flutter', 'N8n', 'OpenAI Fine Tuned'],
    liveUrl: 'https://example.com/codigo-transito',
    githubUrl: 'https://github.com/paulmrg-461/codigo_transito_devpaul',
    category: 'mobile'
  },
  {
    id: '5',
    slug: 'cdaPopayan',
    image: '/portfolio/CDA.png',
    technologies: ['Flutter', 'NestJS', 'SocketIO', 'push notifications'],
    liveUrl: 'https://cda-popayan.web.app',
    githubUrl: 'https://github.com/paulmrg-461/cda_popayan',
    category: 'fullstack'
  },
  {
    id: '6',
    slug: 'devpaulLoans',
    image: '/portfolio/DevPaulLoans.png',
    technologies: ['Flutter', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'Push notifications'],
    liveUrl: 'https://loansdevpaul.web.app',
    githubUrl: 'https://github.com/paulmrg-461/loans_devpaul',
    category: 'fullstack'
  },
  {
    id: '7',
    slug: 'asistenciaAngular',
    image: '/portfolio/AttendanceManager.png',
    technologies: ['Angular', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'Push notifications'],
    liveUrl: 'https://example.com/asistencia-angular',
    githubUrl: 'https://github.com/paulmrg-461/assistance_manager',
    category: 'web'
  },
  {
    id: '8',
    slug: 'schoolManager',
    image: '/portfolio/SchoolManager.png',
    technologies: ['Flutter', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'Push notifications'],
    liveUrl: 'https://example.com/school-manager',
    githubUrl: 'https://github.com/devpaul/school-manager',
    category: 'mobile'
  },
  {
    id: '9',
    slug: 'grupoVista',
    image: '/portfolio/GrupoVista.png',
    technologies: ['ReactJS', 'Flutter', 'NestJS', 'n8n', 'OpenAI'],
    liveUrl: 'https://github.com/paulmrg-461/flutter_vista_app_professionals',
    githubUrl: 'https://github.com/paulmrg-461/flutter_vista_app',
    category: 'fullstack'
  },
  {
    id: '10',
    slug: 'deliveries',
    image: '/portfolio/DeliveryApp.png',
    technologies: ['Flutter', 'NestJS', 'Hasura'],
    liveUrl: 'https://example.com/deliveries',
    githubUrl: 'https://github.com/paulmrg-461/ModEats',
    category: 'mobile'
  },
  {
    id: '11',
    slug: 'diegoLopez',
    image: '/portfolio/EscuelaDiegoLopez.png',
    technologies: ['Flutter', 'NestJS', 'SocketIO'],
    liveUrl: 'https://paulmrg-461.github.io/diego_lopez_react',
    githubUrl: 'https://github.com/paulmrg-461/diego_lopez_react',
    category: 'fullstack'
  },
  {
    id: '12',
    slug: 'jimmyPortfolioFlutter',
    image: '/portfolio/Portfolio.png',
    technologies: ['Flutter'],
    liveUrl: 'https://lucky-bavarois-f06eb5.netlify.app/',
    githubUrl: 'https://github.com/paulmrg-461/devpaul_portfolio',
    category: 'web'
  }
];

export const getProjects = (t: (key: string) => string): Project[] => {
  return projectData.map(project => ({
    ...project,
    title: t(`project.${project.slug}.title`),
    description: t(`project.${project.slug}.description`)
  }));
};

export const services: Service[] = [
  {
    id: '1',
    title: 'services.webDev.title',
    description: 'services.webDev.description',
    icon: 'Code',
    features: ['services.webDev.feature1', 'services.webDev.feature2', 'services.webDev.feature3', 'services.webDev.feature4']
  },
  {
    id: '2',
    title: 'services.mobileDev.title',
    description: 'services.mobileDev.description',
    icon: 'Smartphone',
    features: ['services.mobileDev.feature1', 'services.mobileDev.feature2', 'services.mobileDev.feature3', 'services.mobileDev.feature4']
  },
  {
    id: '3',
    title: 'services.enterprise.title',
    description: 'services.enterprise.description',
    icon: 'Building2',
    features: ['services.enterprise.feature1', 'services.enterprise.feature2', 'services.enterprise.feature3', 'services.enterprise.feature4']
  },
  {
    id: '4',
    title: 'services.aiAutomation.title',
    description: 'services.aiAutomation.description',
    icon: 'Bot',
    features: ['services.aiAutomation.feature1', 'services.aiAutomation.feature2', 'services.aiAutomation.feature3', 'services.aiAutomation.feature4']
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
  { name: 'Azure', level: 85, category: 'tools' },
  { name: 'Docker', level: 80, category: 'tools' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Firebase', level: 85, category: 'tools' },
  
  // AI & Automation
  { name: 'OpenAI API', level: 85, category: 'design' },
  { name: 'Web Scraping', level: 85, category: 'design' },
  { name: 'Chatbots', level: 90, category: 'design' },
  { name: 'Automatización', level: 85, category: 'design' },
  { name: 'Machine Learning', level: 75, category: 'design' }
];

export const getClients = (t: (key: string) => string): Client[] => [
  {
    id: '1',
    name: t('clients.megahogar.name'),
    icon: ShoppingCart,
    description: t('clients.megahogar.description'),
    category: t('clients.megahogar.category')
  },
  {
    id: '2',
    name: t('clients.gh.name'),
    icon: Building2,
    description: t('clients.gh.description'),
    category: t('clients.gh.category')
  },
  {
    id: '3',
    name: t('clients.cda.name'),
    icon: Car,
    description: t('clients.cda.description'),
    category: t('clients.cda.category')
  },
  {
    id: '4',
    name: t('clients.vista.name'),
    icon: Eye,
    description: t('clients.vista.description'),
    category: t('clients.vista.category')
  },
  {
    id: '5',
    name: t('clients.jirehfarma.name'),
    icon: Pill,
    description: t('clients.jirehfarma.description'),
    category: t('clients.jirehfarma.category')
  },
  {
    id: '6',
    name: t('clients.centralAluminios.name'),
    icon: Building2,
    description: t('clients.centralAluminios.description'),
    category: t('clients.centralAluminios.category')
  }
];