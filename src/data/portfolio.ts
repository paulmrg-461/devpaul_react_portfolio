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
    features: ['React & Vue.js', 'Node.js & Express', 'Database Design', 'API Integration']
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps for iOS and Android',
    icon: 'Smartphone',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment']
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces and experiences',
    icon: 'Palette',
    features: ['Figma & Sketch', 'Responsive Design', 'User Research', 'Prototyping']
  },
  {
    id: '4',
    title: 'DevOps & Cloud',
    description: 'Scalable infrastructure and deployment solutions',
    icon: 'Cloud',
    features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Monitoring & Logging']
  }
];

export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'PostgreSQL', level: 75, category: 'backend' },
  { name: 'MongoDB', level: 80, category: 'backend' },
  { name: 'AWS', level: 70, category: 'tools' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Figma', level: 85, category: 'design' },
  { name: 'Adobe XD', level: 80, category: 'design' }
];