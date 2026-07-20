'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordScreen({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const correctPassword = '2024'; // Change this to your desired password (4 digits)

  // Animated glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-submit when 4 digits are entered
  useEffect(() => {
    if (password.length === 4) {
      const timer = setTimeout(() => {
        if (password === correctPassword) {
          onSuccess();
        } else {
          setError(true);
          setTimeout(() => {
            setPassword('');
            setError(false);
          }, 800);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [password, correctPassword, onSuccess]);

  const handleNumberClick = (num) => {
    if (password.length < 4) {
      setPassword(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
      {/* Floating hearts background - Reduced count for performance */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-shiny-red/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.3
          }}
          animate={{
            y: [null, -150, -300],
            opacity: [0.2, 0.4, 0]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 4
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main Content - More compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-sm w-full text-center py-4"
      >
        {/* Glowing Circle with Photo - Smaller */}
        <motion.div
          className="relative mx-auto mb-4"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-28 h-28 rounded-full mx-auto relative overflow-hidden border-4"
            style={{
              borderColor: '#EC5598',
              boxShadow: `0 0 ${30 * glowIntensity}px rgba(236, 85, 152, 0.4), 0 0 ${60 * glowIntensity}px rgba(236, 85, 152, 0.2)`,
              transition: 'box-shadow 1.5s ease-in-out'
            }}
          >
            <Image
             src="/images/profile.jpg"
             alt="Profile"
             fill
             className="object-cover"
            />
          </div>
          
          {/* Decorative rings - Smaller */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              border: '2px solid rgba(236, 85, 152, 0.2)',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full -z-20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.05, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              border: '2px solid rgba(236, 85, 152, 0.15)',
            }}
          />
        </motion.div>

        {/* Locked Text - Smaller */}
        <motion.h2
          className="font-cursive text-2xl text-white mb-1"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🔒 Locked
        </motion.h2>
        <p className="text-white/40 text-xs mb-4 font-light">
          Enter the 4-digit password
        </p>

        {/* Password Dots - 4 dots */}
        <div className="flex justify-center gap-3 mb-5">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: password[i] ? '#EC5598' : 'rgba(255,255,255,0.2)',
                boxShadow: password[i] ? '0 0 15px rgba(236, 85, 152, 0.4)' : 'none',
                transition: 'all 0.3s ease'
              }}
              animate={error ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-shiny-red text-xs mb-3 font-medieval"
          >
            ❌ Incorrect. Try again!
          </motion.p>
        )}

        {/* Number Keypad - Smaller buttons */}
        <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumberClick(num.toString())}
              className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 transition-all duration-200 hover:border-rose-pink/30"
            >
              {num}
            </motion.button>
          ))}
          
          {/* Empty space */}
          <div />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNumberClick('0')}
            className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 transition-all duration-200 hover:border-rose-pink/30"
          >
            0
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="w-full aspect-square rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-lg font-medieval hover:bg-white/10 transition-all duration-200 hover:text-white"
          >
            ⌫
          </motion.button>
        </div>

        {/* Hint */}
        <p className="text-white/20 text-[10px] mt-3 font-light">
          Hint: The year of birth
        </p>
      </motion.div>
    </div>
  );
}
