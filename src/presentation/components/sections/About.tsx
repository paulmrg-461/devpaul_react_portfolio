import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { skills } from '../../../infrastructure/data/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
};

const CATEGORY_STYLES: Record<string, { label: (t: (k: string) => string) => string; from: string; to: string; bar: string }> = {
  frontend: {
    label: t => t('about.frontendMobile'),
    from: 'from-blue-500',
    to: 'to-cyan-400',
    bar: 'from-blue-500 to-cyan-400'
  },
  backend: {
    label: t => t('about.backendDatabase'),
    from: 'from-violet-500',
    to: 'to-purple-400',
    bar: 'from-violet-500 to-purple-400'
  },
  tools: {
    label: t => t('about.toolsCloud'),
    from: 'from-orange-500',
    to: 'to-amber-400',
    bar: 'from-orange-500 to-amber-400'
  },
  design: {
    label: t => t('about.aiAutomation'),
    from: 'from-emerald-500',
    to: 'to-teal-400',
    bar: 'from-emerald-500 to-teal-400'
  }
};

const SkillBar: React.FC<{ skill: typeof skills[0]; barClass: string }> = ({ skill, barClass }) => (
  <motion.div className="mb-4" variants={itemVariants}>
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tabular-nums">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-100 dark:bg-gray-700/60 rounded-full h-2 overflow-hidden">
      <motion.div
        className={`bg-gradient-to-r ${barClass} h-2 rounded-full relative`}
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md -mr-1" />
      </motion.div>
    </div>
  </motion.div>
);

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const highlights = language === 'es'
    ? [
        'Arquitectura Limpia (Clean Architecture) + SOLID',
        'Flutter multiplataforma: Android, iOS, Web, Desktop',
        'Backend robusto con Node.js, NestJS y FastAPI',
        'IA y automatización con OpenAI, Gemini y n8n',
        'Despliegue en Firebase, AWS (EC2, Lambda, S3) y Azure',
        'TDD, Code Review y mejores prácticas de seguridad'
      ]
    : [
        'Clean Architecture + SOLID Principles',
        'Cross-platform Flutter: Android, iOS, Web, Desktop',
        'Robust Backend with Node.js, NestJS and FastAPI',
        'AI & Automation with OpenAI, Gemini and n8n',
        'Deployment on Firebase, AWS (EC2, Lambda, S3) and Azure',
        'TDD, Code Review and Security Best Practices'
      ];

  const categoryOrder = ['frontend', 'backend', 'tools', 'design'] as const;

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="section-tag">{language === 'es' ? '// Sobre mí' : '// About me'}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.title')}
            </h2>
            <div className="accent-line" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* ── Left column ── */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Mascot + highlights */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <motion.div className="flex-shrink-0" whileHover={{ rotate: 5, scale: 1.05 }}>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-xl" />
                    <img
                      src="/capybara.png"
                      alt="DevPaul Mascot"
                      className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-xl"
                    />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Paul Realpe</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {language === 'es' ? 'Desarrollador Full-Stack & Arquitecto de Software' : 'Full-Stack Developer & Software Architect'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('about.description1')}
                  </p>
                </div>
              </div>

              {/* Key highlights */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                  {language === 'es' ? 'Lo que me define' : 'What defines me'}
                </h4>
                <ul className="space-y-2.5">
                  {highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                      variants={itemVariants}
                    >
                      <CheckCircle2 size={17} className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '50+', label: t('about.projectsCompleted') },
                  { value: '7+', label: t('about.yearsExperience') },
                  { value: '9+', label: language === 'es' ? 'Clientes' : 'Clients' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-slate-700/50"
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right column: Skills ── */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-7">
                {t('about.skillsTitle')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {categoryOrder.map((cat) => {
                  const style = CATEGORY_STYLES[cat];
                  const catSkills = skills.filter(s => s.category === cat);
                  return (
                    <div key={cat} className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-4 rounded-full bg-gradient-to-b ${style.from} ${style.to}`} />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {style.label(t)}
                        </h4>
                      </div>
                      {catSkills.map(skill => (
                        <SkillBar key={skill.name} skill={skill} barClass={style.bar} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
