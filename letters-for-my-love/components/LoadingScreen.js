import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  const getRandomPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    };
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-cream via-warm-white to-rose-cream flex flex-col items-center justify-center z-50">
      <div className="relative">
        <motion.div
          className="text-7xl mb-8"
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
          ❤️
        </motion.div>
        <motion.div
          className="absolute -top-8 -right-8 text-5xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      </div>

      <h2 className="font-serif text-3xl text-deep-crimson mb-4 tracking-wide">
        Preparing your birthday surprise...
      </h2>

      <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-crimson via-ruby to-deep-crimson rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <p className="text-sm text-deep-crimson mt-3 font-light">
        {progress}%
      </p>

      {isMounted && [...Array(20)].map((_, i) => {
        const pos = getRandomPosition();
        return (
          <motion.div
            key={i}
            className="absolute text-crimson opacity-20"
            initial={{
              x: pos.x,
              y: pos.y,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, -150, -250],
              opacity: [0.2, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 3
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}
