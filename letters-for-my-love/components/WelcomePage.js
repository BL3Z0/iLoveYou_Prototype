import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WelcomePage({ onMusicChoice, onBegin, isMusicEnabled }) {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showGiftReveal, setShowGiftReveal] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [yesClicks, setYesClicks] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate floating hearts - 60 hearts for FULL effect
  useEffect(() => {
    const hearts = [];
    for (let i = 0; i < 60; i++) {
      hearts.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 6,
        size: Math.random() * 45 + 15,
        opacity: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * 360,
      });
    }
    setFloatingHearts(hearts);
  }, []);

  const handleNoHover = () => {
    if (!isMobile) {
      const newX = (Math.random() - 0.5) * 250;
      const newY = (Math.random() - 0.5) * 250;
      setNoButtonPosition({ x: newX, y: newY });
      setYesButtonSize(prev => prev + 0.2);
      setYesClicks(prev => prev + 1);
    }
  };

  const handleYesClick = () => {
    if (!isMobile) {
      setYesButtonSize(prev => prev + 0.2);
      setYesClicks(prev => prev + 1);
    }
    setShowQuestion(false);
    setShowGiftReveal(true);
    setTimeout(() => {
      setShowGiftReveal(false);
      setShowMusicPrompt(true);
    }, 3000);
  };

  const handleMusicChoice = (choice) => {
    onMusicChoice(choice);
    setShowMusicPrompt(false);
    onBegin();
  };

  // Floating Hearts Component
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-shiny-red"
          initial={{
            x: `${heart.x}%`,
            y: '110vh',
            scale: 0,
            opacity: heart.opacity,
            rotate: heart.rotation,
          }}
          animate={{
            y: '-10vh',
            scale: [0, 1.2, 1, 0.8, 0.6],
            opacity: [heart.opacity, heart.opacity, heart.opacity * 0.7, heart.opacity * 0.3, 0],
            rotate: [heart.rotation, heart.rotation + 180, heart.rotation + 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: `${heart.size}px`,
            textShadow: '0 0 30px rgba(255,0,0,0.4), 0 0 60px rgba(255,0,0,0.2)',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );

  // Question Screen - FIRST PAGE
  if (showQuestion) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-2xl"
        >
          {/* Cartoon Character */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-9xl mb-6"
          >
            🥰
          </motion.div>

          <h1 className="font-cursive text-5xl md:text-7xl text-white mb-4 drop-shadow-2xl">
            Happy Birthday Surprise! 🎉
          </h1>

          <p className="font-medieval text-xl text-white/80 mb-8">
            I have something special for you...
          </p>

          <h2 className="font-cursive text-3xl md:text-5xl text-rose-pink mb-8 drop-shadow-2xl">
            Do you want to see your gift?
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative">
            {/* Yes Button */}
            <motion.button
              onClick={handleYesClick}
              className="px-10 py-4 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval text-xl shadow-2xl hover:shadow-rose-glow transition-all duration-300"
              animate={{
                scale: yesButtonSize,
              }}
              transition={{ duration: 0.3 }}
            >
              Yes Please 💕
            </motion.button>

            {/* No Button */}
            <motion.button
              onClick={isMobile ? handleYesClick : undefined}
              onMouseEnter={!isMobile ? handleNoHover : undefined}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white/70 rounded-full font-medieval text-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              animate={!isMobile ? {
                x: noButtonPosition.x,
                y: noButtonPosition.y,
              } : {}}
              transition={{ duration: 0.2 }}
              style={{
                cursor: isMobile ? 'pointer' : 'default',
              }}
            >
              No Thanks 😅
            </motion.button>
          </div>

          {yesClicks > 0 && (
            <p className="text-white/50 text-sm mt-6 font-medieval">
              You've chased the button {yesClicks} times! 😄
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  // Gift Reveal Screen
  if (showGiftReveal) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10 text-center"
        >
          <motion.h1
            className="font-cinematic text-5xl md:text-7xl text-white drop-shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                '0 0 20px rgba(236, 85, 152, 0.5)',
                '0 0 40px rgba(236, 85, 152, 0.8)',
                '0 0 20px rgba(236, 85, 152, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MADE JUST FOR YOU
          </motion.h1>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-9xl mt-8"
          >
            💐
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Music Prompt Screen
  if (showMusicPrompt) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-2xl w-full text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="font-cursive text-3xl text-white mb-3">
              This experience is best enjoyed with sound.
            </h3>
            <p className="text-white/60 mb-6 font-light">
              Choose how you'd like to continue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleMusicChoice(true)}
                className="px-8 py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medium shadow-lg hover:shadow-rose-glow transition-all duration-300 transform hover:scale-105"
              >
                🎵 Play with Music
              </button>
              <button
                onClick={() => handleMusicChoice(false)}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Continue without Music
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
                     }
