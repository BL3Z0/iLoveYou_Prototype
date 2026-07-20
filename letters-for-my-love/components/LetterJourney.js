'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MedievalLetter from './MedievalLetter';
import TransitionPage from './TransitionPage';
import CelebrationEnding from './CelebrationEnding';
import MemoryBox from './MemoryBox';
import { lettersData } from '../data/letters';

export default function LetterJourney({ onLetterComplete, lettersCompleted }) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMemoryBox, setShowMemoryBox] = useState(false);
  const containerRef = useRef(null);

  const totalLetters = lettersData.length;
  const isComplete = lettersCompleted >= totalLetters;

  useEffect(() => {
    if (showLetter && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [showLetter, currentLetterIndex]);

  const handleLetterRead = () => {
    setShowLetter(false);
    onLetterComplete();

    if (currentLetterIndex < totalLetters - 1) {
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setCurrentLetterIndex(prev => prev + 1);
        setShowLetter(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
    } else {
      setTimeout(() => {
        setShowCelebration(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    }
  };

  const handleViewMemoryBox = () => {
    setShowCelebration(false);
    setShowMemoryBox(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromMemoryBox = () => {
    setShowMemoryBox(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showMemoryBox) {
    return <MemoryBox onBack={handleBackFromMemoryBox} />;
  }

  if (showCelebration) {
    return <CelebrationEnding onViewMemoryBox={handleViewMemoryBox} />;
  }

  const currentLetter = lettersData[currentLetterIndex];
  const isFinalLetter = currentLetterIndex === totalLetters - 1;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-dark-red via-deep-red to-shiny-red flex items-center justify-center px-4 py-16">
      {/* Progress */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
        <div className="backdrop-blur-xl bg-white/10 rounded-full px-6 py-3 shadow-lg border border-white/10">
          <div className="flex justify-between items-center text-sm text-white/60 mb-1">
            <span>Letter {Math.min(lettersCompleted + 1, totalLetters)} of {totalLetters}</span>
            <span>{Math.round((lettersCompleted / totalLetters) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-pink to-shiny-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(lettersCompleted / totalLetters) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {showLetter && !isComplete && (
            <MedievalLetter
              key="letter"
              letter={currentLetter}
              letterNumber={currentLetterIndex + 1}
              totalLetters={totalLetters}
              onContinue={handleLetterRead}
              isFinal={isFinalLetter}
            />
          )}

          {showTransition && (
            <TransitionPage
              key="transition"
              type={currentLetter.transitionType || 'memory'}
              data={currentLetter.transitionData}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
