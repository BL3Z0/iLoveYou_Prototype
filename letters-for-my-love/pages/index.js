// pages/index.js
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Simulate loading
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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <WelcomePage 
            key="welcome"
            onMusicChoice={handleMusicChoice}
            onBegin={handleBeginJourney}
            isMusicEnabled={isMusicEnabled}
          />
        )}
        {currentPage === 'introduction' && (
          <Introduction 
            key="introduction"
            onContinue={handleContinueToLetters}
          />
        )}
        {currentPage === 'letters' && (
          <LetterJourney 
            key="letters"
            onLetterComplete={handleLetterComplete}
            lettersCompleted={lettersCompleted}
          />
        )}
        {currentPage === 'memorybox' && (
          <MemoryBox key="memorybox" />
        )}
      </AnimatePresence>
    </>
  );
}