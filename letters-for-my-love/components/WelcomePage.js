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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // SIMPLE - Direct function for No button
  const handleNoClick = () => {
    if (isMobile) {
      setShowCryingQuby(true);
    }
  };

  const handleNoHover = () => {
    if (!isMobile && !showCryingQuby) {
      const newX = (Math.random() - 0.5) * 200;
      const newY = (Math.random() - 0.5) * 200;
      setNoButtonPosition({ x: newX, y: newY });
      setYesButtonSize(prev => prev + 0.15);
      setYesClicks(prev => prev + 1);
    }
  };

  const handleYesClick = () => {
    setShowQuestion(false);
    setShowGiftReveal(true);
    setTimeout(() => {
      setShowGiftReveal(false);
      setShowMusicPrompt(true);
    }, 2000);
  };

  const handleGoBackAndAccept = () => {
    setShowCryingQuby(false);
    setYesButtonSize(prev => prev + 0.5);
  };

  const handleMusicChoice = (choice) => {
    onMusicChoice(choice);
    setShowMusicPrompt(false);
    onBegin();
  };

  // Question Screen
  if (showQuestion) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl w-full">
          <div className="mb-6">
            <img 
              src="/images/milk-and-mocha-bears.gif" 
              alt="Quby Dancing"
              className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto"
              loading="eager"
            />
          </div>

          <h1 className="font-cursive text-4xl md:text-7xl text-white mb-4 drop-shadow-2xl">
            Happy Birthday Surprise! 🎉
          </h1>

          <p className="font-medieval text-lg md:text-xl text-white/80 mb-6 md:mb-8">
            I have something special for you...
          </p>

          <h2 className="font-cursive text-2xl md:text-5xl text-rose-pink mb-6 md:mb-8 drop-shadow-2xl">
            Do you want to see your gift?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative">
            {/* YES BUTTON */}
            <button
              onClick={handleYesClick}
              className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval text-lg md:text-xl shadow-2xl active:scale-95 transition-transform duration-150"
              style={{
                transform: `scale(${yesButtonSize})`,
              }}
            >
              Yes Please 💕
            </button>

            {/* NO BUTTON - WORKS ON MOBILE */}
            <button
              onClick={handleNoClick}
              onMouseEnter={!isMobile ? handleNoHover : undefined}
              onTouchStart={isMobile ? handleNoClick : undefined}
              className="px-8 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-sm text-white/70 rounded-full font-medieval text-lg md:text-xl border border-white/20 active:bg-white/30 transition-all duration-150"
              style={{
                transform: !isMobile ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` : 'none',
                touchAction: 'manipulation',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
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
        <div className="relative z-10 text-center max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="mb-6">
              <img 
                src="/images/crying-quby.gif" 
                alt="Crying Quby"
                className="w-40 h-40 md:w-56 md:h-56 object-contain mx-auto"
                loading="eager"
              />
            </div>

            <h2 className="font-cursive text-2xl md:text-3xl text-white mb-4">
              😢 Aww, don't say no!
            </h2>
            
            <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 font-light">
              Quby is sad... Please accept the gift! 💝
            </p>

            <button
              onClick={handleGoBackAndAccept}
              className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval text-lg md:text-xl shadow-2xl active:scale-95 transition-transform duration-150"
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
        <div className="relative z-10 text-center">
          <h1 className="font-cinematic text-4xl md:text-7xl text-white drop-shadow-2xl">
            MADE JUST FOR YOU
          </h1>
          <div className="text-7xl md:text-9xl mt-6 md:mt-8">💐</div>
        </div>
      </div>
    );
  }

  // Music Prompt Screen
  if (showMusicPrompt) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-2xl w-full text-center">
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
                onClick={() => handleMusicChoice(true)}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medium shadow-lg active:scale-95 transition-transform duration-150"
              >
                🎵 Play with Music
              </button>
              <button
                onClick={() => handleMusicChoice(false)}
                className="px-6 md:px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 backdrop-blur-sm active:bg-white/30 transition-all duration-150"
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
