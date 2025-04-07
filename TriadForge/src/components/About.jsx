import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      );
    }
  }, [inView]);

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3', label: 'Expert Team Members' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 bg-dark-light"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          ref={titleRef}
          className="section-title text-center mb-16"
        >
          About TriadForge
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={contentRef}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg">
              At TriadForge, we're a team of passionate developers and designers
              dedicated to creating exceptional digital experiences. Our expertise
              lies in the MERN stack (MongoDB, Express.js, React, Node.js),
              allowing us to build robust, scalable, and modern web applications.
            </p>
            <p className="text-gray-300 text-lg">
              Founded by three talented individuals - Venkata Teja, Bhavesh, and
              Raghava - we combine technical excellence with creative innovation to
              deliver solutions that exceed our clients' expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Learn More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border border-primary text-primary
                         hover:bg-primary hover:text-white transition-colors"
              >
                Our Process
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="card text-center p-6"
              >
                <h3 className="text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 