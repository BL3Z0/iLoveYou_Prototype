import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './Envelope';
import LetterPage from './LetterPage';
import TransitionPage from './TransitionPage';
import CelebrationEnding from './CelebrationEnding';
import MemoryBox from './MemoryBox';
import { lettersData } from '../data/letters';

export default function LetterJourney({ onLetterComplete, lettersCompleted }) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMemoryBox, setShowMemoryBox] = useState(false);

  const totalLetters = lettersData.length;
  const isComplete = lettersCompleted >= totalLetters;

  const handleEnvelopeOpen = () => {
    setShowEnvelope(false);
    setShowLetter(true);
  };

  const handleLetterRead = () => {
    setShowLetter(false);
    onLetterComplete();

    if (currentLetterIndex < totalLetters - 1) {
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setCurrentLetterIndex(prev => prev + 1);
        setShowEnvelope(true);
      }, 3000);
    } else {
      // All letters complete - show celebration
      setTimeout(() => {
        setShowCelebration(true);
      }, 1000);
    }
  };

  const handleViewMemoryBox = () => {
    setShowCelebration(false);
    setShowMemoryBox(true);
  };

  const handleBackFromMemoryBox = () => {
    setShowMemoryBox(false);
    // Could go back to home or stay in memory box
  };

  if (showMemoryBox) {
    return <MemoryBox onBack={handleBackFromMemoryBox} />;
  }

  if (showCelebration) {
    return <CelebrationEnding onViewMemoryBox={handleViewMemoryBox} />;
  }

  const currentLetter = lettersData[currentLetterIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-rose-50 flex items-center justify-center px-4 py-16">
      {/* Progress */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-rose-100">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
            <span>Letter {Math.min(lettersCompleted + 1, totalLetters)} of {totalLetters}</span>
            <span>{Math.round((lettersCompleted / totalLetters) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-300 to-rose-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(lettersCompleted / totalLetters) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showEnvelope && !isComplete && (
          <Envelope
            key="envelope"
            letterNumber={currentLetterIndex + 1}
            totalLetters={totalLetters}
            onOpen={handleEnvelopeOpen}
            isFinal={currentLetterIndex === totalLetters - 1}
          />
        )}

        {showLetter && (
          <LetterPage
            key="letter"
            letter={currentLetter}
            letterNumber={currentLetterIndex + 1}
            totalLetters={totalLetters}
            onContinue={handleLetterRead}
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
  );
}