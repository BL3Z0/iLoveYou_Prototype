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
          className={`absolute inset-0 bg-gradient-to-br ${
            isFinal 
              ? 'from-soft-gold via-gold-shimmer to-soft-gold' 
              : 'from-cream via-warm-white to-cream'
          } rounded-xl shadow-luxury border ${
            isFinal ? 'border-soft-gold' : 'border-deep-rose/30'
          }`}
          animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
        >
          {/* Envelope flap */}
          <motion.div
            className="absolute inset-0"
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${
              isFinal 
                ? 'from-gold-shimmer to-soft-gold' 
                : 'from-deep-rose/20 to-cream'
            } rounded-xl`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl">
                  {isFinal ? '💌' : '✉️'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Envelope content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className={`text-sm tracking-widest uppercase font-light ${
                isFinal ? 'text-burgundy' : 'text-deep-rose'
              }`}>
                Letter {letterNumber}
              </span>
              <p className={`font-serif text-2xl mt-1 ${
                isFinal ? 'text-burgundy' : 'text-deep-rose'
              }`}>
                {isFinal ? '❤️ My Heart ❤️' : 'A Love Letter'}
              </p>
              {isFinal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-8 -right-8 text-5xl"
                >
                  ✨
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Seal */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full ${
            isFinal 
              ? 'bg-gradient-to-br from-soft-gold to-gold-shimmer shadow-gold' 
              : 'bg-gradient-to-br from-deep-rose to-burgundy'
          } flex items-center justify-center text-white text-2xl shadow-lg`}
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {isFinal ? '❤️' : '✦'}
        </motion.div>

        {/* Click hint */}
        {!isOpening && (
          <motion.div
            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm ${
              isFinal ? 'text-soft-gold' : 'text-deep-rose/50'
            }`}
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
