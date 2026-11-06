import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Code, Smartphone, Building2, Bot, CheckCircle2 } from 'lucide-react';
import { services } from '../../../infrastructure/data/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
};

const iconMap = { Code, Smartphone, Building2, Bot };

const SERVICE_THEMES = [
  {
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/30',
    bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20',
    border: 'border-blue-100 dark:border-blue-800/30',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  {
    gradient: 'from-purple-500 to-pink-400',
    glow: 'shadow-purple-500/30',
    bg: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20',
    border: 'border-purple-100 dark:border-purple-800/30',
    accent: 'text-purple-600 dark:text-purple-400',
  },
  {
    gradient: 'from-indigo-500 to-blue-400',
    glow: 'shadow-indigo-500/30',
    bg: 'from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20',
    border: 'border-indigo-100 dark:border-indigo-800/30',
    accent: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'shadow-emerald-500/30',
    bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20',
    border: 'border-emerald-100 dark:border-emerald-800/30',
    accent: 'text-emerald-600 dark:text-emerald-400',
  }
];

const ServiceCard: React.FC<{
  service: typeof services[0];
  theme: typeof SERVICE_THEMES[0];
  t: (key: string) => string;
}> = ({ service, theme, t }) => {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <motion.div
      variants={itemVariants}
      className={`relative bg-gradient-to-br ${theme.bg} border ${theme.border} rounded-3xl p-7 group overflow-hidden`}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
    >
      {/* Hover glow overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${theme.bg} rounded-3xl`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-14 h-14 bg-gradient-to-br ${theme.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg ${theme.glow} group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent size={28} className="text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t(service.title)}
        </h3>

        {/* Description */}
        <p className={`text-sm ${theme.accent} font-medium mb-5 leading-relaxed`}>
          {t(service.description)}
        </p>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r ${theme.gradient} opacity-20 mb-5`} />

        {/* Features */}
        <ul className="space-y-2.5">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 size={15} className={theme.accent} />
              {t(feature)}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="services" className="py-24 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-800/40">
              {language === 'es' ? '// Servicios' : '// Services'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('services.title')}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-5" />
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} theme={SERVICE_THEMES[i]} t={t} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
