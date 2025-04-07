import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

const ProjectCard = ({ title, category, image, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="text-primary text-sm mb-2 block">{category}</span>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/90 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View Project
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Portfolio = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const titleRef = useRef(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [inView]);

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: '/portfolio/ecommerce.jpg',
      description: 'A full-featured e-commerce platform with payment integration.',
    },
    {
      title: 'Task Management App',
      category: 'MERN Stack',
      image: '/portfolio/taskmanager.jpg',
      description: 'A collaborative task management application with real-time updates.',
    },
    {
      title: 'Social Media Dashboard',
      category: 'UI/UX Design',
      image: '/portfolio/dashboard.jpg',
      description: 'A modern dashboard for social media analytics and management.',
    },
    {
      title: 'Restaurant Booking System',
      category: 'Web Development',
      image: '/portfolio/restaurant.jpg',
      description: 'An online reservation system for restaurants with table management.',
    },
    {
      title: 'Fitness Tracker',
      category: 'MERN Stack',
      image: '/portfolio/fitness.jpg',
      description: 'A comprehensive fitness tracking application with progress analytics.',
    },
    {
      title: 'Portfolio Website',
      category: 'UI/UX Design',
      image: '/portfolio/portfolio.jpg',
      description: 'A stunning portfolio website with smooth animations and transitions.',
    },
  ];

  const categories = ['all', 'Web Development', 'MERN Stack', 'UI/UX Design'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section
      ref={ref}
      id="portfolio"
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          ref={titleRef}
          className="section-title text-center mb-16"
        >
          Our Portfolio
        </motion.h2>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-dark-light text-gray-300 hover:bg-dark-light/80'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                delay={index * 0.1}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 