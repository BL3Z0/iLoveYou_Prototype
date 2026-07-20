'use client';
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
      {/* Decorative hearts background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-shiny-red/10"
          initial={{
            x: `${(i * 8) % 100}%`,
            y: `${(i * 13) % 100}%`,
            scale: 0.5 + (i % 5) * 0.1,
          }}
          animate={{
            y: [null, '-10vh', '-20vh'],
            opacity: [0.1, 0.2, 0]
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeOut",
            delay: (i * 0.3) % 2,
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="relative z-10 text-center">
        {/* Dancing Gift Box Animation */}
        <motion.div
          className="text-8xl mb-8"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, -5, 0],
            y: [0, -10, 0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🎁
        </motion.div>

        {/* Sparkles around the gift box */}
        <motion.div
          className="absolute -top-4 -right-4 text-2xl"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -left-4 text-2xl"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.8,
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-1/2 -right-8 text-xl"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.1,
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-1/2 -left-8 text-xl"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: 0.3,
          }}
        >
          ✨
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
