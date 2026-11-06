import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/paulmrg-461', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/paul-realpe-631b17a6', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/devpaul.co', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/devpaul_co', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/devpaul_co', label: 'Instagram' },
    { icon: Mail, href: 'mailto:co.devpaul@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/573043162313', label: 'WhatsApp' }
  ];

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'services', label: t('nav.services') },
    { id: 'clients', label: t('nav.clients') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/devpaul_logo.jpeg"
                  alt="DevPaul Logo"
                  className="w-10 h-10 rounded-xl object-cover border border-blue-800/40"
                />
                <span className="text-xl font-bold gradient-text">DevPaul</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
                {language === 'es'
                  ? 'Desarrollador Full-Stack y Arquitecto de Software con 7+ años creando soluciones digitales de impacto.'
                  : 'Full-Stack Developer and Software Architect with 7+ years building impactful digital solutions.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(link => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-slate-800 hover:bg-blue-600/40 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-blue-600/50"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={link.label}
                  >
                    <link.icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                {language === 'es' ? 'Navegación' : 'Navigation'}
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-flex transform duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                {language === 'es' ? 'Contacto' : 'Contact'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:co.devpaul@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                    <Mail size={14} className="text-blue-500 flex-shrink-0" />
                    co.devpaul@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/573043162313" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                    <MessageCircle size={14} className="text-green-500 flex-shrink-0" />
                    +57 304 316 2313
                  </a>
                </li>
                <li>
                  <span className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5 flex-shrink-0">📍</span>
                    Popayán, Cauca, Colombia
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              {t('footer.rights')}
            </p>
            <p className="text-xs text-slate-500">
              {t('footer.madeWith')} <span className="text-red-400">♥</span> {t('footer.by')}
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 bg-slate-800 hover:bg-blue-600/40 rounded-xl transition-colors border border-slate-700/50 hover:border-blue-600/50 text-slate-400 hover:text-white"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
