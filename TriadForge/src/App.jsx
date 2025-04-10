import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Sidebar from './components/Sidebar';
import { useState, useEffect, Suspense, lazy } from 'react';
import Loading from './components/Loading';

// Lazy load components that are not immediately visible
const LazyAbout = lazy(() => import('./components/About'));
const LazyTeam = lazy(() => import('./components/Team'));
const LazyServices = lazy(() => import('./components/Services'));
const LazyContact = lazy(() => import('./components/Contact'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a class to the body to ensure dark theme is applied
    document.body.classList.add('bg-dark');
    
    // Prevent scrolling when loading
    document.body.style.overflow = 'hidden';
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Router>
      <div className="bg-dark min-h-screen text-white">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loading key="loading-screen" />
          ) : (
            <div key="main-content" className="bg-dark">
              <Navbar />
              <Sidebar />
              <main className="bg-dark">
                <Hero />
                <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
                  <LazyAbout />
                </Suspense>
                <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
                  <LazyTeam />
                </Suspense>
                <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
                  <LazyServices />
                </Suspense>
                <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
                  <LazyContact />
                </Suspense>
              </main>
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
