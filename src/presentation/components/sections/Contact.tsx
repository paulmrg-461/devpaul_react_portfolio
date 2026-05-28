import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, MessageCircle } from 'lucide-react';
import type { ContactFormData } from '../../../domain/entities';
import { useLanguage } from '../../contexts/LanguageContext';
import { useContactForm } from '../../hooks/useContactForm';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
};

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const { isSubmitting, submitStatus, submit } = useContactForm(t('contact.thankYou'), t('contact.errorSending'));
  const onSubmit = (data: ContactFormData) => submit(data, reset);

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'co.devpaul@gmail.com', link: 'mailto:co.devpaul@gmail.com' },
    { icon: Phone, title: 'WhatsApp', value: '+57 304 316 2313', link: 'https://wa.me/573043162313' },
    { icon: MapPin, title: language === 'es' ? 'Ubicación' : 'Location', value: 'Popayán, Cauca, Colombia', link: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/paulmrg-461', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/paul-realpe-631b17a6', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/573043162313', label: 'WhatsApp' },
  ];

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600/60 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-sm";

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

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
            <span className="section-tag">{language === 'es' ? '// Contacto' : '// Contact'}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <div className="accent-line" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* ── Left: Info panel ── */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white relative overflow-hidden"
            >
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{t('contact.letsConnect')}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  {language === 'es'
                    ? '¿Tienes un proyecto en mente? Me encantaría escucharte. Hablemos.'
                    : 'Have a project in mind? I\'d love to hear about it. Let\'s talk.'}
                </p>

                {/* Contact items */}
                <div className="space-y-5 mb-8">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.link}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-200 flex-shrink-0">
                        <info.icon size={18} className="text-blue-300" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{info.title}</p>
                        <p className="text-sm text-white font-semibold group-hover:text-blue-300 transition-colors">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social links */}
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Social</p>
                  <div className="flex gap-3">
                    {socialLinks.map(link => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-500/40 transition-all duration-200"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        title={link.label}
                      >
                        <link.icon size={16} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Availability indicator */}
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-sm text-slate-300">
                      {language === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 bg-gray-50 dark:bg-slate-700/30 rounded-3xl p-8 border border-gray-100 dark:border-slate-700/50"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: t('contact.nameRequired') })}
                      className={inputClass}
                      placeholder={t('contact.namePlaceholder')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: t('contact.emailRequired'),
                        pattern: { value: /^\S+@\S+$/i, message: t('contact.emailInvalid') }
                      })}
                      className={inputClass}
                      placeholder={t('contact.emailPlaceholder')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    {...register('subject', { required: t('contact.subjectRequired') })}
                    className={inputClass}
                    placeholder={t('contact.subjectPlaceholder')}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={5}
                    {...register('message', { required: t('contact.messageRequired') })}
                    className={`${inputClass} resize-none`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                {/* Status message */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3.5 rounded-xl flex items-center gap-2.5 text-sm ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800/30'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800/30'
                    }`}
                  >
                    {submitStatus.type === 'success'
                      ? <CheckCircle size={17} />
                      : <AlertCircle size={17} />}
                    {submitStatus.message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 dark:bg-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t('contact.sendMessage')}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
