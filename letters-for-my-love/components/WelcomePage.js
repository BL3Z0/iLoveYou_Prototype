import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import GlassFrame from './GlassFrame';

export default function WelcomePage({ onMusicChoice, onBegin, isMusicEnabled }) {
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const audioRef = useRef(null);

  const handleChoice = (choice) => {
    onMusicChoice(choice);
    setShowMusicPrompt(false);
    
    // If user chose music, play it
    if (choice && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  };

  // Play music when isMusicEnabled becomes true
  useEffect(() => {
    if (isMusicEnabled && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  }, [isMusicEnabled]);

  return (
    <div className="w-full text-center">
      {/* Hidden Audio Player - plays in background */}
      <audio 
        ref={audioRef}
        src="/audio/Pretty_Girl.mp3"
        loop
        preload="auto"
      />

      <GlassFrame>
        {showMusicPrompt ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="font-serif text-3xl text-white mb-3">
              This experience is best enjoyed with sound.
            </h3>
            <p className="text-white/60 mb-6 font-light">
              Choose how you'd like to continue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleChoice(true)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
              >
                🎵 Play with Music
              </button>
              <button
                onClick={() => handleChoice(false)}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
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
              <div className="text-8xl mb-6">💜</div>
              <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">
                Happy 20th Birthday,
                <span className="block text-purple-300 mt-2">[Her Name]</span>
              </h1>
              
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400/50"></div>
                <p className="font-serif text-2xl text-purple-300">✦</p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400/50"></div>
              </div>

              <p className="text-2xl text-white/70 font-light mb-2">
                Five letters.
              </p>
              <p className="text-2xl text-white/70 font-light mb-2">
                Five hearts.
              </p>
              <p className="text-2xl text-purple-300 font-light mb-8">
                One unforgettable birthday.
              </p>

              <p className="text-white/50 max-w-xl mx-auto mb-10 font-light leading-relaxed">
                A journey through words of love, memories, and heartfelt messages from the people who cherish you most.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBegin}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                Begin Your Journey ✨
              </motion.button>
            </motion.div>
          </>
        )}
      </GlassFrame>
    </div>
  );
}
