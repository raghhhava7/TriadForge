import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

const ServiceCard = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-8">
        <div className="w-16 h-16 mb-6 gradient-text text-4xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const titleRef = useRef(null);

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [inView]);

  const services = [
    {
      title: 'Custom Web Development',
      description:
        'Tailored web solutions built with modern technologies to meet your specific business needs.',
      icon: '🌐',
    },
    {
      title: 'MERN Stack Solutions',
      description:
        'Full-stack applications using MongoDB, Express.js, React, and Node.js for robust performance.',
      icon: '⚡',
    },
    {
      title: 'UI/UX Design',
      description:
        'Beautiful and intuitive user interfaces designed to enhance user experience and engagement.',
      icon: '🎨',
    },
    {
      title: 'App Development',
      description:
        'Fast and efficient app development using Flutter and React Native for seamless user experiences.',
      icon: '📱',
    },
    {
      title: 'Database Management',
      description:
        'Efficient database design and management to ensure optimal performance and data security.',
      icon: '🗄️',
    },
    {
      title: 'Cloud Deployment',
      description:
        'Seamless deployment and scaling of applications on cloud platforms for maximum reliability.',
      icon: '☁️',
    },
  ];

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 bg-dark-light"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          ref={titleRef}
          className="section-title text-center mb-16"
        >
          Our Services
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 