import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { smoothScrollTo } from '../utils/smoothScroll';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const activeSection = useScrollSpy(['home', 'about', 'portfolio', 'services', 'contact']);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleNavClick = (sectionId: string) => {
    smoothScrollTo(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <img 
              src="/devpaul_logo.jpeg?auto=compress&cs=tinysrgb&w=100" 
              alt="DevPaul Logo" 
              className="w-8 h-8 object-cover rounded-lg shadow-lg border-2 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            />
            <span className="text-1xl font-bold text-gray-900 dark:text-white">DevPaul</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center space-x-1"
            >
              <Globe size={16} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;