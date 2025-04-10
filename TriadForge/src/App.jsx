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
import { useState, useEffect } from 'react';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="bg-dark min-h-screen">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <Loading key="loading-screen" />
          ) : (
            <div key="main-content">
              <Navbar />
              <Sidebar />
              <main>
                <Hero />
                <About />
                <Team />
                <Services />
                <Contact />
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
