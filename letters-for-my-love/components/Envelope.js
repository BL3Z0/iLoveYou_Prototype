import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import SparkleEffect from './SparkleEffect';

export default function Envelope({ letterNumber, totalLetters, onOpen, isFinal }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Get sender initial from lettersData
  const getSenderInitial = () => {
    // This will be passed from parent or we can use letterNumber
    const initials = ['S', 'M', 'M', 'E', 'B']; // Sarah, Michael, Mom, Emma, Boyfriend
    return initials[letterNumber - 1] || '❤';
  };

  const handleClick = useCallback(() => {
    requestAnimationFrame(() => {
      setIsOpening(true);
      if (isFinal) {
        setShowSparkles(true);
      }
      setTimeout(() => {
        setShowSparkles(false);
        onOpen();
      }, 1200);
    });
  }, [isFinal, onOpen]);

  // ============================================
  // REGULAR ENVELOPE - Real Envelope Design
  // ============================================
  if (!isFinal) {
    const senderInitial = getSenderInitial();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative w-80 h-56">
          {/* Envelope Body - Real envelope shape with fold lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#f5ede3] via-[#e8dccc] to-[#ddd0be] rounded-lg shadow-2xl"
            animate={isOpening ? { scale: 1.03 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Envelope fold lines */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {/* Left fold line */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-1/2 h-full border-r border-[#c4b5a0]/30" />
                <div className="absolute top-0 right-0 w-1/2 h-full border-l border-[#c4b5a0]/30" />
              </div>
              
              {/* Top triangle fold (flap) */}
              <motion.div
                className="absolute inset-0"
                animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0">
                  {/* Flap - triangle shape */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[55%]"
                    style={{
                      background: 'linear-gradient(180deg, #e8dccc, #ddd0be)',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  />
                  {/* Flap inner shadow */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[55%]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.05), transparent)',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Address area - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs tracking-[0.2em] uppercase font-light text-royal-purple/60">
                  Letter {letterNumber}
                </span>
                <p className="font-serif text-xl text-royal-purple/80 mt-1">A Love Letter</p>
              </div>
            </div>

            {/* Stamp - Top right corner with sender initial */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-white/80 rounded-sm shadow-md border border-gray-300 flex items-center justify-center">
              <div className="w-10 h-12 border-2 border-dashed border-royal-purple/30 rounded-sm flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-royal-purple">
                  {senderInitial}
                </span>
              </div>
              {/* Stamp perforations */}
              <div className="absolute -top-1 left-0 right-0 flex justify-between px-1">
                <span className="text-[6px] text-gray-400">● ● ● ●</span>
              </div>
              <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                <span className="text-[6px] text-gray-400">● ● ● ●</span>
              </div>
            </div>

            {/* Wax Seal - Bottom center */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
              style={{
                background: 'radial-gradient(circle at 40% 35%, #c41e3a, #8b0000)',
                boxShadow: '0 2px 8px rgba(139, 0, 0, 0.4), inset 0 -2px 4px rgba(0,0,0,0.2)',
              }}
              animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-serif text-lg">❤</span>
            </motion.div>
          </motion.div>

          {/* Click hint */}
          {!isOpening && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-royal-purple/50 animate-bounce">
              click to open ✨
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // ============================================
  // FINAL ENVELOPE - Majestic Royal Envelope
  // ============================================
  return (
    <>
      <SparkleEffect isActive={showSparkles} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative w-96 h-64">
          {/* Royal Envelope Body */}
          <motion.div
            className="absolute inset-0 rounded-lg shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #1A0A33, #3B1A6B, #6C2BD9, #3B1A6B, #1A0A33)',
              border: '3px solid #9B5DE5',
              boxShadow: '0 0 60px rgba(108, 43, 217, 0.6), inset 0 0 60px rgba(108, 43, 217, 0.3)',
            }}
            animate={isOpening ? { scale: 1.03 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Envelope texture overlay */}
            <div className="absolute inset-0 rounded-lg opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }} />

            {/* Fold lines */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-1/2 h-full border-r border-white/10" />
                <div className="absolute top-0 right-0 w-1/2 h-full border-l border-white/10" />
              </div>
            </div>

            {/* Top flap - Royal Purple */}
            <motion.div
              className="absolute inset-0"
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 left-0 right-0 h-[55%]"
                  style={{
                    background: 'linear-gradient(180deg, #6C2BD9, #3B1A6B)',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  }}
                />
                <div 
                  className="absolute top-0 left-0 right-0 h-[55%]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1), transparent)',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  }}
                />
              </div>
            </motion.div>

            {/* Gold decorative border */}
            <div className="absolute inset-1 rounded-lg border border-soft-gold/20 pointer-events-none" />

            {/* Gold corner accents */}
            <div className="absolute top-3 left-3 text-soft-gold/30 text-sm">✦</div>
            <div className="absolute top-3 right-3 text-soft-gold/30 text-sm">✦</div>
            <div className="absolute bottom-3 left-3 text-soft-gold/30 text-sm">✦</div>
            <div className="absolute bottom-3 right-3 text-soft-gold/30 text-sm">✦</div>

            {/* Content - "My Heart" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-sm tracking-[0.3em] uppercase font-light text-soft-gold/40">
                  Letter {letterNumber} of {totalLetters}
                </span>
                <p className="font-serif text-4xl mt-2" style={{ 
                  color: '#D4AF37',
                  textShadow: '0 0 30px rgba(212, 175, 55, 0.2)'
                }}>
                  ❤️ My Heart ❤️
                </p>
                <p className="text-xs mt-1 text-soft-gold/20 tracking-widest font-light">
                  The Final Letter
                </p>
              </div>
            </div>

            {/* Royal Stamp - Top right with gold border */}
            <div className="absolute top-4 right-4 w-14 h-16 bg-white/10 rounded-sm shadow-lg border border-soft-gold/30 flex items-center justify-center backdrop-blur-sm">
              <div className="w-11 h-13 border-2 border-dashed border-soft-gold/30 rounded-sm flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-soft-gold">❤</span>
              </div>
              <div className="absolute -top-1 left-0 right-0 flex justify-between px-1">
                <span className="text-[6px] text-soft-gold/30">● ● ● ●</span>
              </div>
              <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                <span className="text-[6px] text-soft-gold/30">● ● ● ●</span>
              </div>
            </div>

            {/* Giant Gold Wax Seal - Bottom Right */}
            <motion.div
              className="absolute bottom-6 right-6 w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #D4AF37, #B8860B, #8B6914)',
                border: '3px solid #D4AF37',
                boxShadow: '0 0 50px rgba(212, 175, 55, 0.5), 0 0 100px rgba(212, 175, 55, 0.2)',
                zIndex: 10,
              }}
              animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              🌹
            </motion.div>
          </motion.div>

          {/* Click hint */}
          {!isOpening && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-soft-gold animate-bounce">
              ✦ Click to open your heart ✦
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
