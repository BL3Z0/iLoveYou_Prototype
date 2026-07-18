import { useState, useEffect } from 'react';
import Head from 'next/head';
import LoadingScreen from '../components/LoadingScreen';
import WelcomePage from '../components/WelcomePage';
import Introduction from '../components/Introduction';
import LetterJourney from '../components/LetterJourney';
import MemoryBox from '../components/MemoryBox';
import StarryBackground from '../components/StarryBackground';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [lettersCompleted, setLettersCompleted] = useState(0);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

      {/* Starry Background */}
      <StarryBackground />

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
