import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
      {/* Floating hearts background */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-shiny-red/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, -100, -200],
            opacity: [0.3, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 3
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
          💝
        </motion.div>

        <h2 className="font-cursive text-3xl text-white mb-6">
          Preparing your birthday surprise...
        </h2>

        {/* Loading Bar - NOW VISIBLE! */}
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
