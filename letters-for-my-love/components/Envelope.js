import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Envelope({ letterNumber, totalLetters, onOpen, isFinal }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(onOpen, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-80 h-56">
        {/* Envelope body */}
        <motion.div
          className={`absolute inset-0 rounded-xl shadow-2xl ${
            isFinal 
              ? 'bg-gradient-to-br from-[#3d0c11] via-[#5c121a] to-[#7a1823] border-2 border-[#9e1a2a]' 
              : 'bg-gradient-to-br from-cream via-warm-white to-cream border border-deep-rose/30'
          }`}
          animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
        >
          {/* Majestic glow effect for final envelope */}
          {isFinal && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#9e1a2a]/20 via-transparent to-[#9e1a2a]/10 pointer-events-none" />
          )}

          {/* Envelope flap */}
          <motion.div
            className="absolute inset-0"
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
          >
            <div className={`absolute inset-0 rounded-xl ${
              isFinal 
                ? 'bg-gradient-to-b from-[#7a1823] to-[#5c121a]' 
                : 'bg-gradient-to-b from-deep-rose/20 to-cream'
            }`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">
                  {isFinal ? '🥀' : '✉️'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Envelope content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className={`text-sm tracking-[0.2em] uppercase font-light ${
                isFinal ? 'text-[#d4a373]' : 'text-deep-rose'
              }`}>
                Letter {letterNumber}
              </span>
              <p className={`font-serif text-2xl mt-1 ${
                isFinal ? 'text-[#d4a373]' : 'text-deep-rose'
              }`}>
                {isFinal ? '❤️ My Heart ❤️' : 'A Love Letter'}
              </p>
              {isFinal && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-10 -right-8 text-4xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute -bottom-10 -left-8 text-4xl"
                  >
                    🌹
                  </motion.div>
                  {/* Gold shimmer overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#d4a373]/10 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Majestic Wax Seal for final envelope */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            isFinal ? 'w-16 h-16' : 'w-14 h-14'
          } rounded-full flex items-center justify-center text-white text-2xl shadow-2xl`}
          style={{
            background: isFinal 
              ? 'radial-gradient(circle at 30% 30%, #9e1a2a, #5c121a, #3d0c11)' 
              : 'radial-gradient(circle at 30% 30%, #C9184A, #800F2F)',
            border: isFinal ? '2px solid #d4a373' : 'none',
            boxShadow: isFinal 
              ? '0 0 30px rgba(158, 26, 42, 0.6), 0 0 60px rgba(158, 26, 42, 0.3), inset 0 0 20px rgba(212, 163, 115, 0.2)' 
              : '0 4px 15px rgba(0,0,0,0.2)'
          }}
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {isFinal ? '🌹' : '✦'}
        </motion.div>

        {/* Click hint */}
        {!isOpening && (
          <motion.div
            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm ${
              isFinal ? 'text-[#d4a373]' : 'text-deep-rose/50'
            }`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isFinal ? 'Click to open your heart ❤️' : 'click to open ✨'}
          </motion.div>
        )}
      </div>

      {/* Add keyframes for shimmer animation if not already in globals.css */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </motion.div>
  );
}
