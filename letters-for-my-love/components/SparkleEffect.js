import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SparkleEffect({ isActive }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const generateSparkle = () => {
      return {
        id: Math.random(),
        x: Math.random() * 100, // percentage of container width
        y: -10, // start from top
        size: Math.random() * 12 + 6,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      };
    };

    // Initial sparkles
    const initialSparkles = Array.from({ length: 40 }, generateSparkle);
    setSparkles(initialSparkles);

    // Continuously add new sparkles
    const interval = setInterval(() => {
      setSparkles(prev => {
        const newSparkles = [...prev, generateSparkle()];
        // Keep only last 80 sparkles to prevent memory issues
        if (newSparkles.length > 80) {
          return newSparkles.slice(-80);
        }
        return newSparkles;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          initial={{
            x: `${sparkle.x}%`,
            y: '-10vh',
            scale: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: '110vh',
            scale: [0, 1, 0.5, 1, 0],
            opacity: [1, 1, 0.8, 0.5, 0],
            rotate: sparkle.rotation,
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            ease: "easeOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
          style={{
            fontSize: `${sparkle.size}px`,
            color: '#D4AF37',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.4)',
            left: `${sparkle.x}%`,
            top: '-10vh',
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}
