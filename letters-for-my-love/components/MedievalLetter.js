'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function MedievalLetter({ letter, letterNumber, totalLetters, onContinue, isFinal }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-full max-w-3xl mx-auto px-3 md:px-0"
    >
      {!isOpen ? (
        // ============================================
        // ENVELOPE - Medieval Style (Mobile Optimized)
        // ============================================
        <motion.div
          className="relative cursor-pointer mx-auto w-full max-w-[320px] md:max-w-[340px] aspect-[340/240]"
          onClick={handleOpen}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 rounded-lg shadow-2xl" style={{
            background: 'linear-gradient(145deg, #D4C4A8, #C4B49A, #B4A48A)',
            border: '2px solid #8B7355',
          }}>
            {/* Wax seal */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-xl" style={{
              background: 'radial-gradient(circle at 40% 35%, #8B0000, #4A0000)',
              border: '2px solid #D4AF37',
              boxShadow: '0 0 30px rgba(139, 0, 0, 0.6)',
            }}>
              {isFinal ? '🌹' : '❤'}
            </div>

            {/* Stamp with initial */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-12 md:w-12 md:h-14 bg-white/80 rounded-sm shadow-md border border-gray-300 flex items-center justify-center">
              <div className="w-8 h-10 md:w-10 md:h-12 border-2 border-dashed border-rose-pink/30 rounded-sm flex items-center justify-center">
                <span className="font-serif text-base md:text-xl font-bold text-rose-pink">
                  {letter.from ? letter.from.charAt(0) : '❤'}
                </span>
              </div>
            </div>

            {/* Envelope flap */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-[50%]"
                style={{
                  background: 'linear-gradient(180deg, #C4B49A, #B4A48A)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                }}
              />
            </div>

            {/* Address text */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <p className="font-medieval text-[10px] md:text-xs text-dark-charcoal/60">Letter {letterNumber}</p>
              <p className="font-cursive text-xs md:text-sm text-rose-pink">A Love Letter</p>
            </div>

            {/* Sparkle overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-soft-gold text-base md:text-lg"
                  initial={{
                    x: Math.random() * 320,
                    y: Math.random() * 240,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    scale: [0, 1, 0.5],
                    opacity: [1, 0.8, 0],
                    y: [null, -15 - Math.random() * 30],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3 + 1,
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </div>

            <p className="absolute -bottom-7 md:-bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-[10px] md:text-sm font-medieval animate-bounce">
              Tap to open 📜
            </p>
          </div>
        </motion.div>
      ) : (
        // ============================================
        // LETTER PAPER - Mobile Optimized
        // ============================================
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-lg shadow-2xl overflow-hidden w-full"
          style={{
            backgroundImage: 'url("/images/paper-texture.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #8B7355',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 60px rgba(139, 115, 85, 0.2)',
          }}
        >
          {/* Burnt edges overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(139, 115, 85, 0.15) 80%, rgba(139, 115, 85, 0.3) 100%)',
          }} />
          
          {/* Aged paper texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, #8B7355 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          <div className="relative p-4 md:p-8 lg:p-12">
            {/* Decorative header */}
            <div className="text-center mb-4 md:mb-6">
              <div className="flex justify-center items-center gap-3 md:gap-4">
                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-rose-pink" />
                <span className="text-rose-pink text-sm md:text-base">✦</span>
                <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-rose-pink" />
              </div>
              <p className="font-medieval text-[10px] md:text-xs text-dark-charcoal/50 mt-1 md:mt-2">
                Letter {letterNumber} of {totalLetters}
              </p>
            </div>

            {/* Sender info */}
            <div className="text-center mb-4 md:mb-6">
              <p className="font-cursive text-lg md:text-2xl text-rose-pink">From: {letter.from}</p>
              <p className="font-medieval text-[10px] md:text-xs text-dark-charcoal/40">{letter.relationship}</p>
            </div>

            {/* Letter content */}
            <div className="font-playfair text-dark-charcoal/80 leading-relaxed space-y-3 md:space-y-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-1 md:pr-2">
              {letter.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-xs md:text-sm lg:text-base first:indent-4 md:first:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Photos */}
            {letter.photos && letter.photos.length > 0 && (
              <div className="mt-4 md:mt-6">
                <h4 className="font-medieval text-[10px] md:text-xs text-rose-pink mb-2">📜 Memories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {letter.photos.map((photo, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-rose-pink/20">
                      <img src={photo} alt={`Memory ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Voice message - ONLY Letter 5 */}
            {letter.voiceMessage && letterNumber === 5 && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white/30 rounded-lg border border-rose-pink/20">
                <h4 className="font-medieval text-[10px] md:text-xs text-rose-pink mb-2">🎙️ Listen to Their Voice</h4>
                <audio controls className="w-full h-8 md:h-10">
                  <source src={letter.voiceMessage} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Video message - ONLY Letter 5 */}
            {letter.videoMessage && letterNumber === 5 && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white/30 rounded-lg border border-rose-pink/20">
                <h4 className="font-medieval text-[10px] md:text-xs text-rose-pink mb-2">🎥 Watch Birthday Message</h4>
                <video controls className="w-full rounded-lg h-auto" playsInline>
                  <source src={letter.videoMessage} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div>
            )}

            {/* Continue button */}
            <div className="mt-6 md:mt-8 text-center">
              <button
                onClick={onContinue}
                className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval text-sm md:text-base shadow-lg hover:shadow-rose-glow transition-all duration-200 active:scale-95"
              >
                {letterNumber === totalLetters ? '💫 Continue to the Finale' : 'Continue →'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
