// Create placeholder - Copy full code from the guide 
// components/WelcomePage.js
import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioPlayer from './AudioPlayer';

export default function WelcomePage({ onMusicChoice, onBegin, isMusicEnabled }) {
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const handleChoice = (choice) => {
    onMusicChoice(choice);
    setShowMusicPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-ivory flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl w-full text-center"
      >
        {showMusicPrompt ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-rose-100"
          >
            <div className="text-5xl mb-4">🎵</div>
            <h3 className="font-serif text-2xl text-rose-700 mb-3">
              This experience is best enjoyed with sound.
            </h3>
            <p className="text-gray-600 mb-6 font-light">
              Choose how you'd like to continue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleChoice(true)}
                className="px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                🎵 Play with Music
              </button>
              <button
                onClick={() => handleChoice(false)}
                className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-all duration-300"
              >
                Continue without Music
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-7xl mb-6">💝</div>
              <h1 className="font-serif text-5xl md:text-7xl text-rose-700 mb-4">
                Happy 20th Birthday,
                <span className="block text-rose-500 mt-2">[Her Name]</span>
              </h1>
              
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-px w-16 bg-rose-200"></div>
                <p className="font-serif text-xl text-rose-400">✦</p>
                <div className="h-px w-16 bg-rose-200"></div>
              </div>

              <p className="text-2xl text-gray-600 font-light mb-2">
                Five letters.
              </p>
              <p className="text-2xl text-gray-600 font-light mb-2">
                Five hearts.
              </p>
              <p className="text-2xl text-rose-500 font-light mb-8">
                One unforgettable birthday.
              </p>

              <p className="text-gray-500 max-w-xl mx-auto mb-10 font-light leading-relaxed">
                A journey through words of love, memories, and heartfelt messages from the people who cherish you most.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBegin}
                className="px-10 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-rose-200/50 transition-all duration-300"
              >
                Begin Your Journey ✨
              </motion.button>
            </motion.div>

            {isMusicEnabled && (
              <div className="fixed bottom-6 right-6 z-40">
                <AudioPlayer src="/background-music.mp3" />
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}