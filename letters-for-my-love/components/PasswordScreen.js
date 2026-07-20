'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordScreen({ onSuccess, isRipping }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
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
    if (password.length === 4 && !isRipping) {
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
  }, [password, correctPassword, onSuccess, isRipping]);

  const handleNumberClick = (num) => {
    if (password.length < 4 && !isRipping) {
      setPassword(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    if (!isRipping) {
      setPassword(prev => prev.slice(0, -1));
      setError(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* RIPPING EFFECT - Page tears in half when isRipping is true */}
      <motion.div
        className="relative"
        animate={
          isRipping ? { opacity: 0 } : { opacity: 1 }
        }
        transition={{ duration: 0.1, delay: 0.8 }}
      >
        {/* LEFT HALF - Tears to the left */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red rounded-3xl shadow-2xl overflow-hidden"
          initial={{ x: 0, rotate: 0, scale: 1 }}
          animate={
            isRipping 
              ? { 
                  x: '-120%', 
                  rotate: -20,
                  scale: 0.7,
                }
              : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ 
            duration: 0.9, 
            ease: "easeInOut",
            delay: 0.1
          }}
          style={{
            transformOrigin: 'left center',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            zIndex: 10,
          }}
        >
          {/* Torn edge effect */}
          <div className="absolute right-0 top-0 bottom-0 w-12" style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(212, 175, 55, 0.1) 30%, rgba(212, 175, 55, 0.3) 70%, rgba(212, 175, 55, 0.5) 100%)',
          }} />
          <div className="absolute right-0 top-0 bottom-0 w-6" style={{
            background: 'repeating-linear-gradient(180deg, transparent 0px, rgba(212, 175, 55, 0.15) 2px, transparent 4px, transparent 8px)',
          }} />
        </motion.div>

        {/* RIGHT HALF - Tears to the right */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red rounded-3xl shadow-2xl overflow-hidden"
          initial={{ x: 0, rotate: 0, scale: 1 }}
          animate={
            isRipping 
              ? { 
                  x: '120%', 
                  rotate: 20,
                  scale: 0.7,
                }
              : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ 
            duration: 0.9, 
            ease: "easeInOut",
            delay: 0.1
          }}
          style={{
            transformOrigin: 'right center',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            zIndex: 10,
          }}
        >
          {/* Torn edge effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12" style={{
            background: 'linear-gradient(to left, transparent 0%, rgba(212, 175, 55, 0.1) 30%, rgba(212, 175, 55, 0.3) 70%, rgba(212, 175, 55, 0.5) 100%)',
          }} />
          <div className="absolute left-0 top-0 bottom-0 w-6" style={{
            background: 'repeating-linear-gradient(180deg, transparent 0px, rgba(212, 175, 55, 0.15) 2px, transparent 4px, transparent 8px)',
          }} />
        </motion.div>

        {/* MAIN CONTENT - Stays visible until rip starts */}
        <motion.div
          className={`relative z-20 text-center py-4 ${isRipping ? 'pointer-events-none' : ''}`}
          animate={
            isRipping 
              ? { opacity: 0, scale: 0.8 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.3 }}
        >
          {/* Golden Glowing Circle with YOUR PHOTO */}
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
              className="w-32 h-32 rounded-full mx-auto relative overflow-hidden border-4"
              style={{
                borderColor: '#D4AF37',
                boxShadow: `0 0 ${40 * glowIntensity}px rgba(212, 175, 55, 0.5), 0 0 ${80 * glowIntensity}px rgba(212, 175, 55, 0.25)`,
                transition: 'box-shadow 1.5s ease-in-out',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
              }}
            >
              {/* YOUR PROFILE IMAGE - Place your photo at public/images/profile.jpg */}
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
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
            
            {/* Golden sparkles */}
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

          {/* Password Dots */}
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
      </motion.div>

      {/* SPARKLES BURSTING OUT DURING RIP */}
      {isRipping && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-soft-gold"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 300}%`,
                y: `${50 + (Math.random() - 0.5) * 300}%`,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.2,
                delay: Math.random() * 0.4,
                ease: "easeOut",
              }}
            >
              ✦
            </motion.div>
          ))}
          
          {/* Gold dust */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                background: '#D4AF37',
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
              }}
              initial={{
                x: '50%',
                y: '50%',
                opacity: 1,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 350}%`,
                y: `${50 + (Math.random() - 0.5) * 350}%`,
                opacity: [1, 0.5, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* "Ripping open" text */}
      {isRipping && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white font-cursive text-xl whitespace-nowrap z-50"
        >
          Ripping open your surprise... 💫
        </motion.p>
      )}
    </div>
  );
}
