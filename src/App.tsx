import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SEO from './components/SEO';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
              <SEO />
              <Navigation />
              <main>
                <Suspense fallback={<LoadingSpinner />}>
                  <Hero />
                  <About />
                  <Portfolio />
                  <Services />
                  <Contact />
                </Suspense>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;