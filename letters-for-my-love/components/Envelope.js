import { motion } from 'framer-motion';
import { useState } from 'react';
import SparkleEffect from './SparkleEffect';

export default function Envelope({ letterNumber, totalLetters, onOpen, isFinal }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    if (isFinal) {
      setShowSparkles(true);
    }
    setTimeout(() => {
      setShowSparkles(false);
      onOpen();
    }, 2000);
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
            className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream rounded-xl shadow-luxury border border-royal-purple/30"
            animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-royal-purple/20 to-cream rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl">✉️</div>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-sm tracking-[0.2em] uppercase font-light text-royal-purple">
                  Letter {letterNumber}
                </span>
                <p className="font-serif text-2xl text-royal-purple mt-1">A Love Letter</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-royal-purple to-deep-purple flex items-center justify-center text-white text-2xl shadow-lg"
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            ✦
          </motion.div>

          {!isOpening && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-royal-purple/50"
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
  // FINAL ENVELOPE - MAJESTIC ROYAL PURPLE + GOLD
  // ============================================
  return (
    <>
      <SparkleEffect isActive={showSparkles} />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative w-96 h-64">
          {/* Royal Purple Envelope Body */}
          <motion.div
            className="absolute inset-0 rounded-xl shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #1A0A33, #3B1A6B, #6C2BD9, #3B1A6B, #1A0A33)',
              border: '3px solid #9B5DE5',
              boxShadow: '0 0 80px rgba(108, 43, 217, 0.8), inset 0 0 80px rgba(108, 43, 217, 0.5), 0 0 150px rgba(108, 43, 217, 0.3)',
            }}
            animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
          >
            {/* Majestic purple glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#1A0A33]/80 via-transparent to-[#6C2BD9]/20 pointer-events-none" />
            <div className="absolute inset-[3px] rounded-xl border border-[#9B5DE5]/30 pointer-events-none" />
            
            {/* Gold corner accents */}
            <div className="absolute top-3 left-3 text-soft-gold/30 text-sm">✦</div>
            <div className="absolute top-3 right-3 text-soft-gold/30 text-sm">✦</div>
            <div className="absolute bottom-3 left-3 text-soft-gold/30 text-sm">✦</div>
            <div className="absolute bottom-3 right-3 text-soft-gold/30 text-sm">✦</div>

            {/* Envelope Flap with Giant Rose */}
            <motion.div
              className="absolute inset-0"
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
            >
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(180deg, #6C2BD9, #3B1A6B, #1A0A33)',
                }}
              >
                {/* GIANT ROSE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl drop-shadow-2xl" style={{ 
                    filter: 'drop-shadow(0 0 40px rgba(108, 43, 217, 0.6))'
                  }}>
                    🌹
                  </div>
                </div>
                {/* Gold shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-soft-gold/10 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
              </div>
            </motion.div>

            {/* Content - "My Heart" in GOLD */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-sm tracking-[0.3em] uppercase font-light text-soft-gold/50">
                  Letter {letterNumber} of {totalLetters}
                </span>
                <p className="font-serif text-4xl mt-2" style={{ 
                  color: '#D4AF37',
                  textShadow: '0 0 30px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1)'
                }}>
                  ❤️ My Heart ❤️
                </p>
                <p className="text-xs mt-1 text-soft-gold/30 tracking-widest font-light">
                  The Final Letter
                </p>
              </div>
            </div>

            {/* Pulsing royal glow */}
            <div className="absolute inset-0 rounded-xl pointer-events-none animate-[pulseGlow_3s_ease-in-out_infinite]" style={{
              boxShadow: 'inset 0 0 80px rgba(108, 43, 217, 0.3)',
            }} />
          </motion.div>

          {/* GOLD Wax Seal - Bottom Right */}
          <motion.div
            className="absolute bottom-6 right-6 w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #D4AF37, #B8860B, #8B6914)',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.6), 0 0 100px rgba(212, 175, 55, 0.3)',
              zIndex: 10,
            }}
            animate={isOpening ? { scale: 0, opacity: 0, x: 30, y: 30 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🌹
          </motion.div>

          {/* Click hint - Gold */}
          {!isOpening && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm"
              style={{ color: '#D4AF37' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ Click to open your heart ✦
            </motion.div>
          )}
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulseGlow {
            0%, 100% { 
              box-shadow: inset 0 0 80px rgba(108, 43, 217, 0.3);
            }
            50% { 
              box-shadow: inset 0 0 120px rgba(108, 43, 217, 0.6);
            }
          }
        `}</style>
      </motion.div>
    </>
  );
}
