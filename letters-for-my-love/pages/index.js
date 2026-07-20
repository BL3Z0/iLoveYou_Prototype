import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import LoadingScreen from '../components/LoadingScreen';
import PasswordScreen from '../components/PasswordScreen';
import { AnimatePresence } from 'framer-motion';

// Dynamically import components that use browser features
const WelcomePage = dynamic(() => import('../components/WelcomePage'), { ssr: false });
const LetterJourney = dynamic(() => import('../components/LetterJourney'), { ssr: false });
const MemoryBox = dynamic(() => import('../components/MemoryBox'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isRipping, setIsRipping] = useState(false);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [lettersCompleted, setLettersCompleted] = useState(0);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
    setCurrentPage('letters');
  };

  const handleLetterComplete = () => {
    setLettersCompleted(prev => prev + 1);
  };

  const handlePasswordSuccess = () => {
    setIsRipping(true);
    // Wait for rip animation to complete before showing welcome page
    setTimeout(() => {
      setIsLocked(false);
      setIsRipping(false);
    }, 1200);
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

      {/* Background Music - No loop, stops when page closes */}
      <audio 
        ref={audioRef}
        src="/audio/Shine_Bright_Like_A_Diamond.mp3"
        preload="auto"
      />

      {/* Background Image - Full screen with overlay */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for readability - adjust opacity as needed */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Password Screen with Rip Effect */}
          {isLocked && (
            <div className="w-full max-w-4xl relative">
              <PasswordScreen 
                key="password"
                onSuccess={handlePasswordSuccess}
                isRipping={isRipping}
              />
            </div>
          )}

          {/* Welcome Page - Appears after rip */}
          {!isLocked && currentPage === 'welcome' && (
            <div className="w-full max-w-4xl">
              <WelcomePage 
                key="welcome"
                onMusicChoice={handleMusicChoice}
                onBegin={handleBeginJourney}
                isMusicEnabled={isMusicEnabled}
              />
            </div>
          )}

          {/* Letters Journey */}
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
