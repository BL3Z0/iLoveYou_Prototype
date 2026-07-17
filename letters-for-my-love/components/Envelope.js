import { motion } from 'framer-motion';
import { useState } from 'react';
import SparkleEffect from './SparkleEffect';

export default function Envelope({ letterNumber, totalLetters, onOpen, isFinal }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setShowSparkles(true);
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
  // FINAL ENVELOPE - PURE ROYAL RED
  // USING 100% INLINE STYLES - NO TAILWIND!
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
        style={{ position: 'relative' }}
      >
        <div style={{ position: 'relative', width: '384px', height: '256px' }}>
          {/* PURE ROYAL RED Envelope - INLINE STYLES ONLY */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              background: '#4a0000',
              border: '3px solid #8B0000',
              boxShadow: '0 0 80px rgba(139, 0, 0, 0.8), inset 0 0 80px rgba(139, 0, 0, 0.5)',
            }}
            animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
          >
            {/* Deep red inner glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              background: 'radial-gradient(ellipse at center, #6b0000, #4a0000, #2a0000)',
            }} />
            
            {/* Inner border */}
            <div style={{
              position: 'absolute',
              inset: '3px',
              borderRadius: '10px',
              border: '1px solid rgba(139, 0, 0, 0.3)',
            }} />

            {/* Envelope Flap with Giant Rose */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                overflow: 'hidden',
              }}
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ 
                transformOrigin: 'top', 
                backfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                background: 'linear-gradient(180deg, #6b0000, #4a0000, #2a0000)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* GIANT ROSE */}
                <div style={{
                  fontSize: '120px',
                  filter: 'drop-shadow(0 0 30px rgba(139, 0, 0, 0.6))',
                }}>
                  🌹
                </div>
              </div>
            </motion.div>

            {/* Content - "My Heart" */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              zIndex: 5,
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontSize: '12px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  Letter {letterNumber} of {totalLetters}
                </span>
                <p style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '36px',
                  marginTop: '8px',
                  color: '#ffffff',
                  textShadow: '0 0 30px rgba(255,255,255,0.2)',
                }}>
                  ❤️ My Heart ❤️
                </p>
                <p style={{
                  fontSize: '10px',
                  marginTop: '4px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.2em',
                  fontWeight: '300',
                }}>
                  The Final Letter
                </p>
              </div>
            </div>

            {/* Red pulsing glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              pointerEvents: 'none',
              animation: 'pulseGlow 3s ease-in-out infinite',
              boxShadow: 'inset 0 0 80px rgba(139, 0, 0, 0.3)',
            }} />
          </motion.div>

          {/* RED Wax Seal - Bottom Right */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              background: 'radial-gradient(circle at 30% 30%, #8B0000, #4a0000, #1a0000)',
              border: '3px solid #8B0000',
              boxShadow: '0 0 50px rgba(139, 0, 0, 0.8)',
              zIndex: 10,
            }}
            animate={isOpening ? { scale: 0, opacity: 0, x: 30, y: 30 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🌹
          </motion.div>

          {/* Click hint */}
          {!isOpening && (
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-32px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)',
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ Click to open your heart ✦
            </motion.div>
          )}
        </div>

        <style jsx>{`
          @keyframes pulseGlow {
            0%, 100% { 
              box-shadow: inset 0 0 80px rgba(139, 0, 0, 0.3);
            }
            50% { 
              box-shadow: inset 0 0 120px rgba(139, 0, 0, 0.6);
            }
          }
        `}</style>
      </motion.div>
    </>
  );
}
