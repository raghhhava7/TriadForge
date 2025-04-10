import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use useCallback to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    // Initial check
    handleResize();
    
    // Add event listener with debounce to prevent excessive calls
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  const menuItems = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Team', href: '#team' },
    { title: 'Services', href: '#services' },
    { title: 'Contact', href: '#contact' }
  ];

  const handleClick = useCallback((href) => {
    setIsOpen(false);
    
    // Use setTimeout to ensure the sidebar is closed before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  // Don't render anything on desktop
  if (!isMobile) return null;

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 text-white bg-transparent border-none outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-0.5 bg-white mb-1.5"></div>
        <div className="w-6 h-0.5 bg-white mb-1.5"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {/* Overlay to prevent interaction with content when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-dark/95 backdrop-blur-sm z-40 pt-16 px-4 py-8"
            style={{ 
              WebkitBackdropFilter: 'blur(8px)',
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(17, 24, 39, 0.95)' // Explicit dark color
            }}
          >
            <nav className="space-y-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleClick(item.href)}
                    className="block text-white hover:text-primary transition-colors duration-300 w-full text-left"
                  >
                    {item.title}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 