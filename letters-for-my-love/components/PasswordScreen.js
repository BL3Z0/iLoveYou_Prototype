'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordScreen({ onSuccess, isRipping }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const correctPassword = '2024';

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

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
      <motion.div
        className="relative"
        animate={isRipping ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.8 }}
      >
        {/* LEFT HALF */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red rounded-3xl shadow-2xl overflow-hidden"
          initial={{ x: 0, rotate: 0, scale: 1 }}
          animate={
            isRipping 
              ? { x: '-120%', rotate: -20, scale: 0.7 }
              : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
          style={{
            transformOrigin: 'left center',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            zIndex: 10,
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-12" style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(212, 175, 55, 0.1) 30%, rgba(212, 175, 55, 0.3) 70%, rgba(212, 175, 55, 0.5) 100%)',
          }} />
          <div className="absolute right-0 top-0 bottom-0 w-6" style={{
            background: 'repeating-linear-gradient(180deg, transparent 0px, rgba(212, 175, 55, 0.15) 2px, transparent 4px, transparent 8px)',
          }} />
        </motion.div>

        {/* RIGHT HALF */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red rounded-3xl shadow-2xl overflow-hidden"
          initial={{ x: 0, rotate: 0, scale: 1 }}
          animate={
            isRipping 
              ? { x: '120%', rotate: 20, scale: 0.7 }
              : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
          style={{
            transformOrigin: 'right center',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            zIndex: 10,
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-12" style={{
            background: 'linear-gradient(to left, transparent 0%, rgba(212, 175, 55, 0.1) 30%, rgba(212, 175, 55, 0.3) 70%, rgba(212, 175, 55, 0.5) 100%)',
          }} />
          <div className="absolute left-0 top-0 bottom-0 w-6" style={{
            background: 'repeating-linear-gradient(180deg, transparent 0px, rgba(212, 175, 55, 0.15) 2px, transparent 4px, transparent 8px)',
          }} />
        </motion.div>

        {/* MAIN CONTENT - Fixed position, no animation causing shifts */}
        <div
          className={`relative z-20 text-center py-4 ${isRipping ? 'pointer-events-none' : ''}`}
          style={{
            opacity: isRipping ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Golden Glowing Circle */}
          <div className="relative mx-auto mb-4 w-32 h-32">
            <div 
              className="w-32 h-32 rounded-full mx-auto relative overflow-hidden border-4"
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
            </div>
            
            {/* Static decorative rings - no animation */}
            <div className="absolute inset-0 rounded-full -z-10" style={{
              border: '2px solid rgba(212, 175, 55, 0.25)',
              transform: 'scale(1.1)',
            }} />
            <div className="absolute inset-0 rounded-full -z-20" style={{
              border: '2px solid rgba(212, 175, 55, 0.15)',
              transform: 'scale(1.25)',
            }} />
          </div>

          {/* Locked Text - No animation causing shifts */}
          <h2 className="font-cursive text-2xl text-white mb-1">
            🔒 Locked
          </h2>
          <p className="text-white/40 text-xs mb-4 font-light">
            Enter the 4-digit password
          </p>

          {/* Password Dots */}
          <div className="flex justify-center gap-3 mb-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: password[i] ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                  boxShadow: password[i] ? '0 0 15px rgba(212, 175, 55, 0.5)' : 'none',
                }}
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
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 active:bg-white/30 transition-colors duration-150 hover:border-soft-gold/50"
              >
                {num}
              </button>
            ))}
            
            <div />
            
            <button
              onClick={() => handleNumberClick('0')}
              className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 active:bg-white/30 transition-colors duration-150 hover:border-soft-gold/50"
            >
              0
            </button>

            <button
              onClick={handleDelete}
              className="w-full aspect-square rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-lg font-medieval hover:bg-white/10 active:bg-white/20 transition-colors duration-150 hover:text-white"
            >
              ⌫
            </button>
          </div>

          <p className="text-white/20 text-[10px] mt-3 font-light">
            Hint: The year of birth
          </p>
        </div>
      </motion.div>

      {/* Sparkles during rip - Only render when ripping */}
      {isRipping && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
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
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white font-cursive text-xl whitespace-nowrap"
          >
            Ripping open your surprise... 💫
          </motion.p>
        </div>
      )}
    </div>
  );
}
