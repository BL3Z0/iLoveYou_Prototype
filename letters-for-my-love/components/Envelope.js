import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Envelope({ letterNumber, totalLetters, onOpen, isFinal }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(onOpen, 2000);
  };

  // Regular envelope design
  if (!isFinal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative w-80 h-56">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream rounded-xl shadow-luxury border border-deep-rose/30"
            animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-deep-rose/20 to-cream rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl">✉️</div>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-sm tracking-[0.2em] uppercase font-light text-deep-rose">
                  Letter {letterNumber}
                </span>
                <p className="font-serif text-2xl text-deep-rose mt-1">A Love Letter</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-deep-rose to-burgundy flex items-center justify-center text-white text-2xl shadow-lg"
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            ✦
          </motion.div>

          {!isOpening && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-deep-rose/50"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              click to open ✨
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // ============================================
  // FINAL ENVELOPE - Royal Red with Rose
  // ============================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-96 h-64">
        {/* Royal Red Envelope Body */}
        <motion.div
          className="absolute inset-0 rounded-xl shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #6B0000, #8B0000, #4A0000)',
            border: '3px solid #A52A2A',
            boxShadow: '0 0 60px rgba(139, 0, 0, 0.5), inset 0 0 60px rgba(139, 0, 0, 0.3)',
          }}
          animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
        >
          {/* Subtle glow overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-[#8B0000]/20 to-[#A52A2A]/10 pointer-events-none" />
          
          {/* Gold border accent */}
          <div className="absolute inset-0 rounded-xl border border-[#D4AF37]/30 pointer-events-none" />
          
          {/* Decorative gold corners */}
          <div className="absolute top-2 left-2 text-[#D4AF37]/40 text-xl">✦</div>
          <div className="absolute top-2 right-2 text-[#D4AF37]/40 text-xl">✦</div>
          <div className="absolute bottom-2 left-2 text-[#D4AF37]/40 text-xl">✦</div>
          <div className="absolute bottom-2 right-2 text-[#D4AF37]/40 text-xl">✦</div>

          {/* Envelope Flap with Rose */}
          <motion.div
            className="absolute inset-0"
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
          >
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(180deg, #8B0000, #6B0000)',
              }}
            >
              {/* Large Rose Flower on the flap */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl opacity-90">🌹</div>
              </div>
              {/* Gold shimmer across the rose */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
            </div>
          </motion.div>

          {/* Content - "My Heart" Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-sm tracking-[0.3em] uppercase font-light text-[#D4AF37]">
                Letter {letterNumber} of {totalLetters}
              </span>
              <p className="font-serif text-3xl mt-2" style={{ color: '#D4AF37' }}>
                ❤️ My Heart ❤️
              </p>
              <p className="text-xs mt-1 text-[#D4AF37]/60 tracking-widest font-light">
                The Final Letter
              </p>
            </div>
          </div>
        </motion.div>

        {/* Wax Seal - Positioned to the SIDE (bottom right) */}
        <motion.div
          className="absolute bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #D4AF37, #B8860B, #8B6914)',
            border: '2px solid #D4AF37',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.2)',
            zIndex: 10,
          }}
          animate={isOpening ? { scale: 0, opacity: 0, x: 20, y: 20 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🌹
        </motion.div>

        {/* Small rose accent on top left */}
        <div className="absolute top-4 left-4 text-2xl opacity-60">🌹</div>

        {/* Floating rose petals animation (background) */}
        {!isOpening && (
          <>
            <motion.div
              className="absolute -top-4 -right-4 text-3xl opacity-40"
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌹
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 text-2xl opacity-30"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              🌹
            </motion.div>
          </>
        )}

        {/* Click hint */}
        {!isOpening && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm"
            style={{ color: '#D4AF37' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to open your heart ❤️
          </motion.div>
        )}
      </div>

      {/* Keyframes for shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </motion.div>
  );
}
