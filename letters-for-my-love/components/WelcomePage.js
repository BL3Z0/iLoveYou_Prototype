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
    <div className="min-h-screen bg-gradient-to-b from-cream via-warm-white to-lavender flex items-center justify-center px-4">
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
            className="bg-warm-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-luxury border border-royal-purple/20"
          >
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="font-serif text-3xl text-deep-purple mb-3">
              This experience is best enjoyed with sound.
            </h3>
            <p className="text-dark-charcoal/60 mb-6 font-light">
              Choose how you'd like to continue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleChoice(true)}
                className="px-8 py-3 bg-gradient-to-r from-royal-purple to-deep-purple text-white rounded-full font-medium shadow-luxury hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105"
              >
                🎵 Play with Music
              </button>
              <button
                onClick={() => handleChoice(false)}
                className="px-8 py-3 bg-dark-charcoal/10 text-dark-charcoal rounded-full font-medium hover:bg-dark-charcoal/20 transition-all duration-300"
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
              <h1 className="font-serif text-5xl md:text-7xl text-deep-purple mb-4">
                Happy 20th Birthday,
                <span className="block text-royal-purple mt-2">[Her Name]</span>
              </h1>
              
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-soft-gold"></div>
                <p className="font-serif text-2xl text-soft-gold">✦</p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-soft-gold"></div>
              </div>

              <p className="text-2xl text-dark-charcoal/70 font-light mb-2">
                Five letters.
              </p>
              <p className="text-2xl text-dark-charcoal/70 font-light mb-2">
                Five hearts.
              </p>
              <p className="text-2xl text-royal-purple font-light mb-8">
                One unforgettable birthday.
              </p>

              <p className="text-dark-charcoal/50 max-w-xl mx-auto mb-10 font-light leading-relaxed">
                A journey through words of love, memories, and heartfelt messages from the people who cherish you most.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBegin}
                className="px-10 py-4 bg-gradient-to-r from-deep-purple to-amethyst text-white rounded-full text-lg font-medium shadow-luxury hover:shadow-purple-glow transition-all duration-300"
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
