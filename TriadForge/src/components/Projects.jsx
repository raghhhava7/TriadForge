import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform built with MERN stack, featuring real-time inventory management and secure payment processing.',
    image: '/projects/ecommerce.jpg',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    image: '/projects/taskmanager.jpg',
    tech: ['React', 'Firebase', 'Material-UI'],
    link: '#'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A modern portfolio website with smooth animations and responsive design.',
    image: '/projects/portfolio.jpg',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    link: '#'
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for managing social media accounts and analytics.',
    image: '/projects/dashboard.jpg',
    tech: ['React', 'Node.js', 'Chart.js'],
    link: '#'
  }
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="min-h-screen bg-dark py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Our Projects</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped businesses achieve their goals.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div 
            ref={sliderRef}
            className="overflow-hidden"
          >
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-dark-light rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 gradient-text">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        className="btn-primary inline-block"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-dark-light p-3 rounded-full text-white hover:bg-primary transition-colors"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-dark-light p-3 rounded-full text-white hover:bg-primary transition-colors"
          >
            <FaArrowRight />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 