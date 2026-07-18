import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import LoadingScreen from '../components/LoadingScreen';
import WelcomePage from '../components/WelcomePage';
import Introduction from '../components/Introduction';
import LetterJourney from '../components/LetterJourney';
import MemoryBox from '../components/MemoryBox';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [lettersCompleted, setLettersCompleted] = useState(0);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle music playback when enabled
  useEffect(() => {
    if (isMusicEnabled && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  }, [isMusicEnabled]);

  const handleMusicChoice = (choice) => {
    setIsMusicEnabled(choice);
  };

  const handleBeginJourney = () => {
    setCurrentPage('introduction');
  };

  const handleContinueToLetters = () => {
    setCurrentPage('letters');
  };

  const handleLetterComplete = () => {
    setLettersCompleted(prev => prev + 1);
  };

  const toggleDayNight = () => {
    setIsNightMode(!isNightMode);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Letters for My Love - Happy 20th Birthday</title>
        <meta name="description" content="A special birthday experience for someone extraordinary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Music - Persistent across all pages */}
      <audio 
        ref={audioRef}
        src="/audio/Pretty_Girl.mp3"
        loop
        preload="auto"
      />

      {/* Background Image - Changes based on Day/Night mode */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: isNightMode 
            ? 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80")' // Night/Misty Mountain
            : 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80")', // Day Nature
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Darker overlay for night mode */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isNightMode ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/30 backdrop-blur-sm'
        }`} />
      </div>

      {/* Day/Night Toggle Button - Shows after welcome page */}
      {currentPage !== 'welcome' && (
        <button
          onClick={toggleDayNight}
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2 shadow-lg"
        >
          {isNightMode ? (
            <>
              <span className="text-lg">🌙</span>
              <span className="text-sm">Night</span>
            </>
          ) : (
            <>
              <span className="text-lg">☀️</span>
              <span className="text-sm">Day</span>
            </>
          )}
        </button>
      )}

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {currentPage === 'welcome' && (
            <div className="w-full max-w-4xl">
              <WelcomePage 
                key="welcome"
                onMusicChoice={handleMusicChoice}
                onBegin={handleBeginJourney}
                isMusicEnabled={isMusicEnabled}
              />
            </div>
          )}
          {currentPage === 'introduction' && (
            <div className="w-full max-w-4xl">
              <Introduction 
                key="introduction"
                onContinue={handleContinueToLetters}
              />
            </div>
          )}
          {currentPage === 'letters' && (
            <div className="w-full max-w-4xl">
              <LetterJourney 
                key="letters"
                onLetterComplete={handleLetterComplete}
                lettersCompleted={lettersCompleted}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
