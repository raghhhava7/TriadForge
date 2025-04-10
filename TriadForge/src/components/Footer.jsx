import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/triadforge' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/triadforge' },
    { icon: <FaTwitter />, url: 'https://twitter.com/triadforge' },
    { icon: <FaInstagram />, url: 'https://instagram.com/triadforge' },
  ];

  const footerLinks = [
    { title: 'Home', href: '#hero' },
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Portfolio', href: '#portfolio' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">TriadForge</h3>
            <p className="text-gray-300">
              Crafting exceptional digital experiences with cutting-edge technology
              and creative innovation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: '#00f5ff' }}
                  className="text-gray-400 text-xl transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#00f5ff' }}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="#services"
                  whileHover={{ x: 5, color: '#00f5ff' }}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Web Development
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#services"
                  whileHover={{ x: 5, color: '#00f5ff' }}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  MERN Stack Solutions
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#services"
                  whileHover={{ x: 5, color: '#00f5ff' }}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  UI/UX Design
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#services"
                  whileHover={{ x: 5, color: '#00f5ff' }}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  App Development
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#services"
                  whileHover={{ x: 5, color: '#00f5ff' }}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  More 😉
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">contact@triadforge.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} TriadForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 