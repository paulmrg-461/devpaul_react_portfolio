import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { getClients } from '../../../infrastructure/data/portfolio';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
};

const SECTOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Retail: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-100 dark:border-orange-800/30' },
  Empresarial: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-800/30' },
  Business: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-800/30' },
  Automotriz: { bg: 'bg-slate-50 dark:bg-slate-800/50', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-100 dark:border-slate-700/30' },
  Automotive: { bg: 'bg-slate-50 dark:bg-slate-800/50', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-100 dark:border-slate-700/30' },
  Servicios: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-800/30' },
  Services: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-800/30' },
  Salud: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-100 dark:border-red-800/30' },
  Health: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-100 dark:border-red-800/30' },
  Industrial: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-500', border: 'border-yellow-100 dark:border-yellow-800/30' },
  Tecnología: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-100 dark:border-cyan-800/30' },
  Technology: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-100 dark:border-cyan-800/30' },
};

const DEFAULT_SECTOR = { bg: 'bg-gray-50 dark:bg-slate-800/50', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-100 dark:border-slate-700/30' };

const ClientCard: React.FC<{ client: ReturnType<typeof getClients>[0]; index: number }> = ({ client, index }) => {
  const IconComponent = client.icon;
  const sectorStyle = SECTOR_COLORS[client.category] ?? DEFAULT_SECTOR;

  const iconGradients = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-indigo-500 to-blue-400',
    'from-emerald-500 to-teal-400',
    'from-rose-500 to-pink-400',
    'from-amber-500 to-orange-400',
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 flex-shrink-0 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-1">
            {client.name}
          </h3>
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${sectorStyle.bg} ${sectorStyle.text} ${sectorStyle.border} border`}>
            {client.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
        {client.description}
      </p>
    </motion.div>
  );
};

const Clients: React.FC = () => {
  const { t, language } = useLanguage();
  const clients = getClients(t);

  const techStack = ['Flutter', 'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Firebase', 'AWS', 'OpenAI', 'PostgreSQL', 'Docker', 'NestJS', 'FastAPI', 'MongoDB', 'Azure'];

  return (
    <section id="clients" className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="section-tag">{language === 'es' ? '// Clientes' : '// Clients'}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('clients.title')}
            </h2>
            <div className="accent-line" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('clients.subtitle')}
            </p>
          </motion.div>

          {/* Client cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {clients.map((client, i) => (
              <ClientCard key={client.id} client={client} index={i} />
            ))}
          </div>

          {/* Tech stack marquee */}
          <motion.div variants={itemVariants}>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
              {language === 'es' ? 'Tecnologías que utilizo' : 'Technologies I work with'}
            </p>
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/40 py-4">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...techStack, ...techStack].map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 mx-4 px-4 py-1.5 rounded-full bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40 text-sm font-semibold text-gray-600 dark:text-gray-300 flex-shrink-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
