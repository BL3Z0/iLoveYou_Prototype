'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordScreen({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showHeartCrack, setShowHeartCrack] = useState(false);
  const correctPassword = '2024';

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
          // Start unlock animation
          setIsUnlocking(true);
          setShowHeartCrack(true);
          setTimeout(() => {
            onSuccess();
          }, 1800);
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
    if (password.length < 4 && !isUnlocking) {
      setPassword(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    if (!isUnlocking) {
      setPassword(prev => prev.slice(0, -1));
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
      {/* Floating hearts background */}
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

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!isUnlocking ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-sm w-full text-center py-4"
          >
            {/* Golden Glowing Circle with Photo - NOT CUT OFF */}
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
                className="w-32 h-32 rounded-full mx-auto relative overflow-hidden border-4 flex items-center justify-center"
                style={{
                  borderColor: '#D4AF37',
                  boxShadow: `0 0 ${40 * glowIntensity}px rgba(212, 175, 55, 0.5), 0 0 ${80 * glowIntensity}px rgba(212, 175, 55, 0.25)`,
                  transition: 'box-shadow 1.5s ease-in-out',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                {/* Uncomment for actual image */}
                {/* <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                /> */}
              </div>
              
              {/* Golden decorative rings */}
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
                  border: '2px solid rgba(212, 175, 55, 0.25)',
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
                  border: '2px solid rgba(212, 175, 55, 0.15)',
                }}
              />
              
              {/* Golden sparkles around the circle */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-soft-gold text-lg"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2 + 1,
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </motion.div>

            {/* Locked Text */}
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

            {/* Password Dots - Golden when filled */}
            <div className="flex justify-center gap-3 mb-5">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: password[i] ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                    boxShadow: password[i] ? '0 0 15px rgba(212, 175, 55, 0.5)' : 'none',
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

            {/* Number Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num.toString())}
                  className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 transition-all duration-200 hover:border-soft-gold/50"
                >
                  {num}
                </motion.button>
              ))}
              
              <div />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNumberClick('0')}
                className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 transition-all duration-200 hover:border-soft-gold/50"
              >
                0
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="w-full aspect-square rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-lg font-medieval hover:bg-white/10 transition-all duration-200 hover:text-white"
              >
                ⌫
              </motion.button>
            </div>

            <p className="text-white/20 text-[10px] mt-3 font-light">
              Hint: The year of birth
            </p>
          </motion.div>
        ) : (
          // ============================================
          // HEART CRACKING / SPLITTING ANIMATION
          // ============================================
          <motion.div
            key="unlocking"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="text-9xl mx-auto relative"
              animate={{
                scale: [1, 1.2, 0.8, 1.5, 0],
                rotate: [0, 10, -10, 20, -20, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut",
              }}
            >
              💔
            </motion.div>
            
            {/* Crack lines */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5 }}
            >
              <div className="w-40 h-40 relative">
                <motion.div
                  className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-soft-gold"
                  style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 1.2 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-soft-gold"
                  style={{ transform: 'translate(-50%, -50%) rotate(-45deg)' }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 1.2, delay: 0.1 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-soft-gold"
                  style={{ transform: 'translate(-50%, -50%)' }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              </div>
            </motion.div>

            {/* Golden sparkles bursting out */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-soft-gold text-2xl"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.3,
                  ease: "easeOut",
                }}
              >
                ✦
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white font-cursive text-2xl mt-8"
            >
              Unlocking your surprise... 💫
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
