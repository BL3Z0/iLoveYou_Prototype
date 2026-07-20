import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import LoadingScreen from '../components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

// Dynamically import components that use browser features
const PasswordScreen = dynamic(() => import('../components/PasswordScreen'), { ssr: false });
const WelcomePage = dynamic(() => import('../components/WelcomePage'), { ssr: false });
const LetterJourney = dynamic(() => import('../components/LetterJourney'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
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
    setIsLocked(false);
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

      {/* Background Music */}
      <audio 
        ref={audioRef}
        src="/audio/Shine_Bright_Like_A_Diamond.mp3"
        preload="auto"
      />

      {/* Solid Red Background with gradient and shadows */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-dark-red via-deep-red to-shiny-red">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {isLocked && (
            <div className="w-full max-w-4xl relative">
              <PasswordScreen 
                key="password"
                onSuccess={handlePasswordSuccess}
              />
            </div>
          )}

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
