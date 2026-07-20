'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MusicPrompt({ onMusicChoice }) {
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 6,
        size: Math.random() * 35 + 15,
        opacity: Math.random() * 0.4 + 0.1,
        rotation: Math.random() * 360,
      });
    }
    setFloatingHearts(hearts);
  }, []);

  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-shiny-red"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `floatHeart ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          ❤️
        </div>
      ))}
      <style jsx>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
            transform: translateY(80vh) rotate(45deg) scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: translateY(40vh) rotate(180deg) scale(1);
          }
          100% {
            transform: translateY(-10vh) rotate(360deg) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="text-5xl md:text-6xl mb-4">🎵</div>
          <h3 className="font-cursive text-2xl md:text-3xl text-white mb-3">
            This experience is best enjoyed with sound.
          </h3>
          <p className="text-white/60 mb-6 font-light text-sm md:text-base">
            Choose how you'd like to continue
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onMusicChoice(true)}
              className="px-6 md:px-8 py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medium shadow-lg active:scale-95 transition-transform duration-150"
            >
              🎵 Play with Music
            </button>
            <button
              onClick={() => onMusicChoice(false)}
              className="px-6 md:px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 backdrop-blur-sm active:bg-white/30 transition-all duration-150"
            >
              Continue without Music
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
