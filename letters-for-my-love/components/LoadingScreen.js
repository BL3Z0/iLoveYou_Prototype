'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate hearts only on client side
    if (typeof window !== 'undefined') {
      const newHearts = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 5 + 3,
          delay: Math.random() * 3,
        });
      }
      setHearts(newHearts);
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Floating hearts - Only render on client */}
      {isMounted && hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-shiny-red/30"
          initial={{
            x: heart.x,
            y: heart.y,
            scale: heart.scale,
          }}
          animate={{
            y: [null, -100, -200],
            opacity: [0.3, 0.6, 0]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: heart.delay
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="relative z-10 text-center">
        <motion.div
          className="text-8xl mb-8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎁
        </motion.div>

        <h2 className="font-cursive text-3xl text-white mb-6">
          Preparing your birthday surprise...
        </h2>

        <div className="w-72 h-3 bg-white/20 rounded-full overflow-hidden shadow-inner border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-pink via-shiny-red to-rose-pink rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: '0 0 20px rgba(236, 85, 152, 0.5), 0 0 40px rgba(204, 0, 0, 0.3)',
            }}
          />
        </div>
        
        <p className="text-white/60 text-sm mt-3 font-light">
          {progress}%
        </p>
      </div>
    </div>
  );
}
