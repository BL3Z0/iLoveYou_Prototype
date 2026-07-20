'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordScreen({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const correctPassword = '202426'; // Change this to your desired password

  // Animated glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleNumberClick = (num) => {
    if (password.length < 6) {
      setPassword(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
    setError(false);
  };

  const handleSubmit = () => {
    if (password === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => {
        setPassword('');
        setError(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating hearts background */}
      {[...Array(25)].map((_, i) => (
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        {/* Glowing Circle with Photo */}
        <motion.div
          className="relative mx-auto mb-8"
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
            className="w-40 h-40 rounded-full mx-auto relative overflow-hidden border-4"
            style={{
              borderColor: '#EC5598',
              boxShadow: `0 0 ${40 * glowIntensity}px rgba(236, 85, 152, 0.4), 0 0 ${80 * glowIntensity}px rgba(236, 85, 152, 0.2)`,
              transition: 'box-shadow 1.5s ease-in-out'
            }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
            {/* Uncomment below and comment above to use actual image */}
            {/* <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            /> */}
          </div>
          
          {/* Decorative rings */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            animate={{
              scale: [1, 1.3, 1],
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
              scale: [1, 1.6, 1],
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

        {/* Locked Text */}
        <motion.h2
          className="font-cursive text-3xl text-white mb-2"
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
        <p className="text-white/40 text-sm mb-6 font-light">
          Enter the password to unlock your surprise
        </p>

        {/* Password Display */}
        <div className="flex justify-center gap-3 mb-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-10 h-12 rounded-lg border-2 bg-white/5 flex items-center justify-center text-white font-medieval text-xl"
              style={{
                borderColor: error ? '#CC0000' : (password[i] ? '#EC5598' : 'rgba(255,255,255,0.2)'),
                boxShadow: error ? '0 0 20px rgba(204, 0, 0, 0.3)' : (password[i] ? '0 0 20px rgba(236, 85, 152, 0.2)' : 'none'),
              }}
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {password[i] || ''}
            </motion.div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-shiny-red text-sm mb-4 font-medieval"
          >
            ❌ Incorrect password. Try again!
          </motion.p>
        )}

        {/* Number Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumberClick(num.toString())}
              className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-2xl font-medieval hover:bg-white/20 transition-all duration-200 hover:border-rose-pink/30"
            >
              {num}
            </motion.button>
          ))}
          
          {/* Empty space for alignment */}
          <div />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNumberClick('0')}
            className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-2xl font-medieval hover:bg-white/20 transition-all duration-200 hover:border-rose-pink/30"
          >
            0
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="w-full aspect-square rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-xl font-medieval hover:bg-white/10 transition-all duration-200 hover:text-white"
          >
            ⌫
          </motion.button>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className={`mt-6 px-8 py-3 rounded-full font-medieval text-white transition-all duration-300 ${
            password.length === 6
              ? 'bg-gradient-to-r from-rose-pink to-shiny-red shadow-lg hover:shadow-rose-glow'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
          disabled={password.length !== 6}
        >
          Unlock 💫
        </motion.button>

        {/* Hint */}
        <p className="text-white/20 text-xs mt-4 font-light">
          Hint: The year of birth
        </p>
      </motion.div>
    </div>
  );
}
