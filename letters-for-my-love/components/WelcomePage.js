'use client';
import { useState, useEffect, useCallback } from 'react';

export default function WelcomePage({ onMusicChoice, onBegin, isMusicEnabled }) {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showGiftReveal, setShowGiftReveal] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [showCryingQuby, setShowCryingQuby] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [yesClicks, setYesClicks] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
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
      
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const handleNoClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      setShowCryingQuby(true);
    }
  }, [isMobile]);

  const handleNoHover = useCallback(() => {
    if (!isMobile && !showCryingQuby) {
      const newX = (Math.random() - 0.5) * 200;
      const newY = (Math.random() - 0.5) * 200;
      setNoButtonPosition({ x: newX, y: newY });
      setYesButtonSize(prev => prev + 0.15);
      setYesClicks(prev => prev + 1);
    }
  }, [isMobile, showCryingQuby]);

  // SIMPLIFIED - No heavy animations
  const handleYesClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowQuestion(false);
    setShowGiftReveal(true);
    
    setTimeout(() => {
      setShowGiftReveal(false);
      setShowMusicPrompt(true);
    }, 2000);
  }, []);

  const handleGoBackAndAccept = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCryingQuby(false);
    setYesButtonSize(prev => prev + 0.5);
  }, []);

  const handleMusicChoice = useCallback((choice) => {
    onMusicChoice(choice);
    setShowMusicPrompt(false);
    onBegin();
  }, [onMusicChoice, onBegin]);

  // SIMPLIFIED - No motion animations for hearts
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

  // Question Screen
  if (showQuestion) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />

        <div className="relative z-10 text-center max-w-2xl">
          <div className="mb-6">
            <img 
              src="/images/milk-and-mocha-bears.gif" 
              alt="Quby Dancing"
              className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto"
              loading="eager"
            />
          </div>

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
            {/* YES BUTTON - SIMPLIFIED, NO ANIMATIONS */}
            <button
              onClick={handleYesClick}
              className="px-10 py-4 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval text-xl shadow-2xl"
              style={{
                transform: `scale(${yesButtonSize})`,
                transition: 'transform 0.15s ease',
              }}
            >
              Yes Please 💕
            </button>

            {/* NO BUTTON - SIMPLIFIED */}
            <button
              onClick={handleNoClick}
              onMouseEnter={!isMobile ? handleNoHover : undefined}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white/70 rounded-full font-medieval text-xl border border-white/20"
              style={{
                transform: !isMobile ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` : 'none',
                transition: 'transform 0.12s ease',
                touchAction: 'manipulation',
              }}
            >
              No Thanks 😅
            </button>
          </div>

          {yesClicks > 0 && (
            <p className="text-white/50 text-sm mt-6 font-medieval">
              You've chased the button {yesClicks} times! 😄
            </p>
          )}
        </div>
      </div>
    );
  }

  // Crying Quby Popup
  if (showCryingQuby) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />

        <div className="relative z-10 text-center max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="mb-6">
              <img 
                src="/images/crying-quby.gif" 
                alt="Crying Quby"
                className="w-48 h-48 md:w-56 md:h-56 object-contain mx-auto"
                loading="eager"
              />
            </div>

            <h2 className="font-cursive text-3xl text-white mb-4">
              😢 Aww, don't say no!
            </h2>
            
            <p className="text-white/70 text-lg mb-8 font-light">
              Quby is sad... Please accept the gift! 💝
            </p>

            <button
              onClick={handleGoBackAndAccept}
              className="px-10 py-4 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval text-xl shadow-2xl"
            >
              Go Back & Accept 💕
            </button>

            <p className="text-white/30 text-xs mt-4 font-light">
              (Don't make Quby cry again! 😅)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Gift Reveal Screen
  if (showGiftReveal) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />
        
        <div className="relative z-10 text-center">
          <h1 className="font-cinematic text-5xl md:text-7xl text-white drop-shadow-2xl">
            MADE JUST FOR YOU
          </h1>
          
          <div className="text-9xl mt-8">
            💐
          </div>
        </div>
      </div>
    );
  }

  // Music Prompt Screen
  if (showMusicPrompt) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <FloatingHearts />

        <div className="relative z-10 max-w-2xl w-full text-center">
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
                className="px-8 py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medium shadow-lg"
              >
                🎵 Play with Music
              </button>
              <button
                onClick={() => handleMusicChoice(false)}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 backdrop-blur-sm"
              >
                Continue without Music
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
