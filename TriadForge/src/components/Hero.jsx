import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

const Globe = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  if (inView) {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.6, ease: 'back.out(1.7)' }
    );
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Globe />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
        >
          Crafting Your Vision into Reality
        </motion.h1>
        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          We transform ideas into exceptional digital experiences using cutting-edge
          technology and creative innovation.
        </motion.p>
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero; 