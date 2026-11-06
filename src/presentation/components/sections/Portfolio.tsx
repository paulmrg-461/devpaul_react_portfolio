import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { getProjects } from '../../../infrastructure/data/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Project } from '../../../domain/entities';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
};

const CATEGORY_COLORS: Record<string, string> = {
  web: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  mobile: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  fullstack: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  desktop: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.div
    variants={itemVariants}
    layout
    className="group relative bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300"
    whileHover={{ y: -6 }}
  >
    {/* Image */}
    <div className="relative overflow-hidden h-48">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.web} backdrop-blur-sm`}>
          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </span>
      </div>

      {/* Hover overlay with actions */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
        <div className="flex gap-2">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold hover:bg-white/30 transition-colors border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={13} />
              Live
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold hover:bg-white/30 transition-colors border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={13} />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 line-clamp-1">
        {project.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-xs rounded-full font-medium"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 text-xs rounded-full">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const Portfolio: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: t('portfolio.allProjects') },
    { id: 'web', label: t('portfolio.webApps') },
    { id: 'mobile', label: t('portfolio.mobileApps') },
    { id: 'fullstack', label: t('portfolio.fullStack') },
    { id: 'desktop', label: t('portfolio.desktopApps') }
  ];

  const allProjects = getProjects(t);
  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="section-tag">{language === 'es' ? '// Portafolio' : '// Portfolio'}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('portfolio.title')}
            </h2>
            <div className="accent-line" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2.5 mb-10"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-slate-700/60 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600/60'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Project grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
