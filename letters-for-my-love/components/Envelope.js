// Create placeholder - Copy full code from the guide 
// components/Envelope.js
import { motion } from 'framer-motion';
import { useState } from 'react';
import SparkleEffect from './SparkleEffect';

export default function Envelope({ letterNumber, totalLetters, onOpen, isFinal }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
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
              ? 'from-rose-200 via-rose-300 to-rose-400' 
              : 'from-ivory via-white to-rose-50'
          } rounded-xl shadow-2xl border ${
            isFinal ? 'border-rose-400' : 'border-rose-200'
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
                ? 'from-rose-300 to-rose-200' 
                : 'from-rose-100 to-ivory'
            } rounded-xl`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">
                  {isFinal ? '💌' : '✉️'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Envelope content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-rose-400 text-sm tracking-widest uppercase font-light">
                Letter {letterNumber}
              </span>
              <p className="font-serif text-2xl text-rose-600 mt-1">
                {isFinal ? '❤️ My Heart ❤️' : 'A Love Letter'}
              </p>
              {isFinal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-8 -right-8 text-4xl"
                >
                  ✨
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Seal */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${
            isFinal 
              ? 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg' 
              : 'bg-rose-300'
          } flex items-center justify-center text-white text-xl shadow-md`}
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {isFinal ? '❤️' : '✦'}
        </motion.div>

        {/* Click hint */}
        {!isOpening && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-rose-300 text-sm"
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
