import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './presentation/contexts/ThemeContext';
import { LanguageProvider } from './presentation/contexts/LanguageContext';
import ErrorBoundary from './presentation/components/shared/ErrorBoundary';
import LoadingSpinner from './presentation/components/shared/LoadingSpinner';
import SEO from './presentation/components/shared/SEO';
import Navigation from './presentation/components/layout/Navigation';
import Footer from './presentation/components/layout/Footer';

const Hero = lazy(() => import('./presentation/components/sections/Hero'));
const About = lazy(() => import('./presentation/components/sections/About'));
const Portfolio = lazy(() => import('./presentation/components/sections/Portfolio'));
const Services = lazy(() => import('./presentation/components/sections/Services'));
const Clients = lazy(() => import('./presentation/components/sections/Clients'));
const Contact = lazy(() => import('./presentation/components/sections/Contact'));
const Chatbot = lazy(() => import('./presentation/components/shared/Chatbot'));

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
              <SEO />
              <Navigation />
              <Suspense fallback={<LoadingSpinner />}>
                <main>
                  <Hero />
                  <About />
                  <Portfolio />
                  <Services />
                  <Clients />
                  <Contact />
                </main>
                <Footer />
                <Chatbot />
              </Suspense>
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
