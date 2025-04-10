import { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Stars, Sphere } from '@react-three/drei';
import tejaPhoto from '../assets/teja.jpg';
import bhaveshPhoto from '../assets/bhavesh.jpg';
import raghavaPhoto from '../assets/raghava.jpg';

const Globe = () => {
  const globeRef = useRef();
  
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.3;
      globeRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[15, 64, 64]}>
        <meshStandardMaterial
          color="#00f6ff"
          transparent
          opacity={0.6}
          wireframe
          emissive="#00f6ff"
          emissiveIntensity={1.5}
        />
      </Sphere>
      <Sphere args={[15.3, 64, 64]}>
        <meshStandardMaterial
          color="#00a8ff"
          transparent
          opacity={0.3}
          wireframe
          emissive="#00a8ff"
          emissiveIntensity={0.8}
        />
      </Sphere>
      <Sphere args={[14.7, 64, 64]}>
        <meshStandardMaterial
          color="#00f6ff"
          transparent
          opacity={0.4}
          wireframe
          emissive="#00f6ff"
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  );
};

const TeamMember3D = ({ modelPath }) => {
  // If modelPath is null, just return the fallback scene
  if (!modelPath) {
    return (
      <>
        <Environment preset="city" />
        <Stars radius={600} depth={250} count={25000} factor={4} saturation={0} fade speed={1} />
        <Globe />
      </>
    );
  }

  try {
    const { scene } = useGLTF(modelPath);
    return (
      <>
        <primitive object={scene} scale={3} position={[0, 0, 0]} />
        <Environment preset="city" />
        <Stars radius={600} depth={250} count={25000} factor={4} saturation={0} fade speed={1} />
        <Globe />
      </>
    );
  } catch (error) {
    console.error('Error loading 3D model:', error);
    // Return a fallback 3D scene instead of null
    return (
      <>
        <Environment preset="city" />
        <Stars radius={600} depth={250} count={25000} factor={4} saturation={0} fade speed={1} />
        <Globe />
      </>
    );
  }
};

const TeamMember = ({ name, role, bio, image, delay, modelPath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const canvasRef = useRef(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (show3D && canvasRef.current) {
      const canvas = canvasRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              setShow3D(false);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(canvas);
      return () => observer.disconnect();
    }
  }, [show3D]);

  // Add cleanup for WebGL context
  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
      }
    };
  }, []);

  // Handle touch events for mobile scrolling
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    isScrolling.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isScrolling.current) {
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartY.current;
      
      // If the user is trying to scroll (vertical movement is greater than horizontal)
      if (Math.abs(deltaY) > 10) {
        isScrolling.current = true;
        // Temporarily hide 3D to allow scrolling
        setShow3D(false);
        
        // Re-enable 3D after a short delay
        setTimeout(() => {
          setShow3D(true);
        }, 500);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card group relative overflow-hidden h-[500px] bg-dark"
      onMouseEnter={() => {
        setIsHovered(true);
        setShow3D(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShow3D(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {show3D ? (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={canvasRef}
              className="w-full h-full"
            >
              <Suspense fallback={<div className="w-full h-full bg-dark" />}>
                <Canvas 
                  camera={{ position: [0, 0, 25] }}
                  gl={{ 
                    powerPreference: "high-performance",
                    antialias: true,
                    alpha: true 
                  }}
                  style={{ touchAction: "pan-y" }}
                >
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} intensity={4} />
                  <pointLight position={[-10, -10, -10]} intensity={3} />
                  <pointLight position={[0, 0, 10]} intensity={2} />
                  <TeamMember3D modelPath={modelPath} />
                  <OrbitControls 
                    enableZoom={false} 
                    autoRotate 
                    autoRotateSpeed={2}
                    enablePan={false}
                    enableTouch={false}
                  />
                </Canvas>
              </Suspense>
            </motion.div>
          ) : (
            <motion.img
              key="2d-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark opacity-80" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="text-primary text-sm mb-2 block font-pointifax">{role}</span>
        <h3 className="text-2xl font-bold text-white mb-2 font-pointifax">{name}</h3>
        <p className="text-gray-300 font-pointifax">{bio}</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-dark/90 flex items-center justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary font-pointifax"
        >
          View Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const Team = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: 'Venkata Teja',
      role: '',
      bio: 'Expert in creating beautiful and intuitive user interfaces with a focus on user experience. MERN stack developer, DSA enthusiast, and Flutter developer with a passion for building visually appealing applications.',
      image: tejaPhoto,
      modelPath: null,
    },
    {
      id: 2,
      name: 'Bhavesh',
      role: '',
      bio: 'Specializes in server-side development and creating robust backend solutions. MERN stack developer with expertise in Java and React Native for building scalable server architectures.',
      image: bhaveshPhoto,
      modelPath: null,
    },
    {
      id: 3,
      name: 'Raghava',
      role: '',
      bio: 'Expert in IoT development and creating connected solutions. Specializes in MongoDB, Express.js, React, and Node.js, delivering innovative IoT applications and smart solutions.',
      image: raghavaPhoto,
      modelPath: null,
    },
  ];

  return (
    <section
      ref={ref}
      id="team"
      className="py-20 bg-dark"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          ref={titleRef}
          className="section-title text-center mb-16 font-pointifax"
        >
          Our Team
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              {...member}
              delay={member.id * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team; 