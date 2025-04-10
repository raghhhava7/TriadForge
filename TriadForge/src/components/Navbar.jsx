import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <RouterLink
            to="/"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img src={logo} alt="TriadForge Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold gradient-text">TriadForge</span>
          </RouterLink>

          <div className="hidden md:flex items-center space-x-8">
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-white hover:text-primary transition-colors cursor-pointer"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              className="text-white hover:text-primary transition-colors cursor-pointer"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="team"
              smooth={true}
              duration={500}
              className="text-white hover:text-primary transition-colors cursor-pointer"
            >
              Team
            </ScrollLink>
            <RouterLink
              to="/projects"
              className="text-white hover:text-primary transition-colors"
            >
              Projects
            </RouterLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="btn-primary cursor-pointer"
            >
              Contact
            </ScrollLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 