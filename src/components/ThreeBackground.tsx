import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ThreeBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/10 blur-[120px] rounded-full animate-pulse"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/10 blur-[150px] rounded-full"
        style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
      />

      {/* 3D Floating Elements Container */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 perspective-1000"
      >
        {/* Abstract 3D Shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              z: Math.random() * -800,
              rotateX: Math.random() * 360,
              rotateY: Math.random() * 360
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              y: ['0%', '15%', '0%'],
              x: ['0%', '5%', '0%']
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-24 h-24 border border-white/5 glass opacity-10 rounded-lg"
            style={{
              transform: `translate3d(${mousePos.x * (i % 5 + 1) * 0.15}px, ${mousePos.y * (i % 5 + 1) * 0.15}px, ${i * -50}px)`,
              boxShadow: i % 3 === 0 ? '0 0 20px rgba(57, 255, 20, 0.1)' : 'none'
            }}
          />
        ))}

        {/* Floating Clothing Silhouettes (using icons or simple shapes) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
           <div className="w-[80vw] h-[80vh] border-[1px] border-white/5 rounded-full rotate-45" />
           <div className="absolute w-[60vw] h-[60vh] border-[1px] border-white/5 rounded-full -rotate-12" />
        </div>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
