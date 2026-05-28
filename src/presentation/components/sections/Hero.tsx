import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Download, Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ROLES_ES = ['Flutter Specialist', 'React Expert', 'Arquitecto de Software', 'AI Builder'];
const ROLES_EN = ['Flutter Specialist', 'React Expert', 'Software Architect', 'AI Builder'];

const TypingEffect: React.FC<{ roles: string[] }> = ({ roles }) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIdx];
    const delay = deleting ? 40 : displayed.length === full.length ? 1800 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < full.length) setDisplayed(full.slice(0, displayed.length + 1));
        else setDeleting(true);
      } else {
        if (displayed.length > 0) setDisplayed(displayed.slice(0, -1));
        else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx, roles]);

  return (
    <span className="text-blue-500 dark:text-cyan-400 font-semibold">
      {displayed}
      <span className="inline-block w-0.5 h-[1.1em] bg-blue-500 dark:bg-cyan-400 ml-0.5 animate-cursor-blink align-middle" />
    </span>
  );
};

const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 40);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const roles = language === 'es' ? ROLES_ES : ROLES_EN;

  const socialLinks = [
    { icon: Github, href: 'https://github.com/paulmrg-461', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/paul-realpe-631b17a6', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/devpaul.co', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/devpaul_co', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/devpaul_co', label: 'Instagram' },
    { icon: Mail, href: 'mailto:co.devpaul@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/573043162313', label: 'WhatsApp' }
  ];

  const stats = [
    { value: 50, suffix: '+', label: language === 'es' ? 'Proyectos' : 'Projects' },
    { value: 7, suffix: '+', label: language === 'es' ? 'Años Exp.' : 'Years Exp.' },
    { value: 9, suffix: '+', label: language === 'es' ? 'Clientes' : 'Clients' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/30 dark:to-slate-950">

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ top: '-5%', left: '5%' }} />
        <div className="absolute w-96 h-96 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" style={{ top: '55%', right: '0%' }} />
        <div className="absolute w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/8 rounded-full blur-3xl animate-blob animation-delay-4000" style={{ bottom: '5%', left: '45%' }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">

            {/* ── Left: Text ── */}
            <motion.div
              className="lg:col-span-3 text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/60 text-gray-600 dark:text-gray-300 text-sm font-medium mb-6 shadow-sm"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                {language === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
              </motion.div>

              {/* Greeting */}
              <motion.p
                className="text-base text-gray-500 dark:text-gray-400 mb-1 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {language === 'es' ? 'Hola, soy' : "Hi, I'm"}
              </motion.p>

              {/* Name */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="gradient-text">Paul Realpe</span>
              </motion.h1>

              {/* Typing role */}
              <motion.div
                className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-5 flex items-center justify-center lg:justify-start gap-1.5 min-h-[2rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="font-light">Full-Stack Dev &amp;&nbsp;</span>
                <TypingEffect roles={roles} />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {t('hero.description')}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('hero.getInTouch')}
                </motion.button>

                <motion.button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = 'https://drive.google.com/uc?export=download&id=1W5wdlFCmh-RcZNLND44Oq_7q6ACwN_lZ';
                    link.setAttribute('download', 'Paul_Realpe_CV.pdf');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-8 py-3.5 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} />
                  {t('hero.downloadCV')}
                </motion.button>
              </motion.div>

              {/* Social icons */}
              <motion.div
                className="flex justify-center lg:justify-start flex-wrap gap-2.5 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white dark:bg-slate-800/80 rounded-full shadow-sm hover:shadow-md border border-gray-200/80 dark:border-slate-700/50 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-200"
                    whileHover={{ scale: 1.18, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    title={link.label}
                  >
                    <link.icon size={19} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex justify-center lg:justify-start gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl font-bold gradient-text">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Photo ── */}
            <motion.div
              className="lg:col-span-2 flex justify-center order-1 lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">

                {/* Soft glow aura behind photo */}
                <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-400/25 via-purple-400/20 to-cyan-400/20 blur-2xl animate-glow" />

                {/* Ring 1 — dashed, clearly visible on both modes */}
                <div className="absolute -inset-7 rounded-full border-2 border-dashed border-blue-400/55 dark:border-blue-400/40 animate-spin-slow" />
                <div className="absolute -inset-7 rounded-full animate-spin-slow">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/70 border-2 border-white dark:border-slate-900" />
                </div>

                {/* Ring 2 — solid outer, subtle */}
                <div className="absolute -inset-14 rounded-full border border-purple-400/35 dark:border-purple-400/22 animate-spin-slow-reverse" />
                <div className="absolute -inset-14 rounded-full animate-spin-slow-reverse">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg shadow-purple-500/65 border-2 border-white dark:border-slate-900" />
                </div>

                {/* Photo with 3px gradient border */}
                <div className="relative z-10 w-full h-full rounded-full p-[3px] bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 shadow-2xl shadow-blue-500/25 dark:shadow-blue-500/35">
                  <motion.img
                    src="/paul.jpeg"
                    alt="Paul Realpe"
                    className="w-full h-full rounded-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </div>

                {/* Floating tech badges — colored dots */}
                <motion.div
                  className="absolute -left-12 lg:-left-16 top-[22%] bg-white dark:bg-slate-800 rounded-2xl px-3 py-1.5 shadow-lg whitespace-nowrap border border-blue-100 dark:border-blue-800/40 flex items-center gap-1.5"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 shadow-sm shadow-blue-400/60" />
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Flutter</span>
                </motion.div>

                <motion.div
                  className="absolute -right-10 lg:-right-14 top-[22%] bg-white dark:bg-slate-800 rounded-2xl px-3 py-1.5 shadow-lg whitespace-nowrap border border-purple-100 dark:border-purple-800/40 flex items-center gap-1.5"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 shadow-sm shadow-purple-400/60" />
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">React</span>
                </motion.div>

                <motion.div
                  className="absolute -right-8 lg:-right-12 top-[64%] bg-white dark:bg-slate-800 rounded-2xl px-3 py-1.5 shadow-lg whitespace-nowrap border border-cyan-100 dark:border-cyan-800/40 flex items-center gap-1.5"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                  <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 shadow-sm shadow-cyan-400/60" />
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">AI / ML</span>
                </motion.div>

                <motion.div
                  className="absolute -left-10 lg:-left-14 top-[64%] bg-white dark:bg-slate-800 rounded-2xl px-3 py-1.5 shadow-lg whitespace-nowrap border border-emerald-100 dark:border-emerald-800/40 flex items-center gap-1.5"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                >
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 shadow-sm shadow-emerald-400/60" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Node.js</span>
                </motion.div>

                {/* Online indicator */}
                <motion.div
                  className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-white dark:bg-slate-800/95 rounded-full px-2.5 py-1 shadow-lg border border-gray-100 dark:border-slate-700/60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring' }}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'es' ? 'En línea' : 'Online'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 cursor-default select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
