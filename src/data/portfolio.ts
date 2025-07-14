import { Project, Service, Skill, Client } from '../types';
import { Building2, ShoppingCart, Car, Eye, Users, Pill } from 'lucide-react';

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
  { name: 'Docker', level: 80, category: 'tools' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Firebase', level: 85, category: 'tools' },
  
  // AI & Automation
  { name: 'OpenAI API', level: 85, category: 'design' },
  { name: 'Chatbots', level: 90, category: 'design' },
  { name: 'Automatización', level: 85, category: 'design' },
  { name: 'Machine Learning', level: 75, category: 'design' }
];

export const getClients = (t: (key: string) => string): Client[] => [
  {
      id: '1',
      name: 'MegaHogar Supermercados',
      icon: ShoppingCart,
      description: t('clients.megahogar.description'),
      category: 'Retail'
    },
    {
      id: '2',
      name: 'Grupo Empresarial G&H SAS',
      icon: Building2,
      description: t('clients.gh.description'),
      category: 'Empresarial'
    },
    {
      id: '3',
      name: 'CDA Panamericana Popayán',
      icon: Car,
      description: t('clients.cda.description'),
      category: 'Automotriz'
    },
    {
      id: '4',
      name: 'Grupo Vista SAS',
      icon: Eye,
      description: t('clients.vista.description'),
      category: 'Servicios'
    },
    {
      id: '5',
      name: 'Comunix',
      icon: Users,
      description: t('clients.comunix.description'),
      category: 'Tecnología'
    },
    {
      id: '6',
      name: 'Farmacia Jirehfarma',
      icon: Pill,
      description: t('clients.jirehfarma.description'),
      category: 'Salud'
    },
    {
      id: '7',
      name: t('clients.centralAluminios.name'),
      icon: Building2,
      description: t('clients.centralAluminios.description'),
      category: t('clients.centralAluminios.category')
    }
];