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
      className="w-full max-w-3xl mx-auto"
    >
      {!isOpen ? (
        // ============================================
        // ENVELOPE - Medieval Style
        // ============================================
        <motion.div
          className="relative cursor-pointer mx-auto w-full max-w-[340px] aspect-[340/240]"
          onClick={handleOpen}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 rounded-lg shadow-2xl" style={{
            background: 'linear-gradient(145deg, #D4C4A8, #C4B49A, #B4A48A)',
            border: '2px solid #8B7355',
          }}>
            {/* Wax seal */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-xl" style={{
              background: 'radial-gradient(circle at 40% 35%, #8B0000, #4A0000)',
              border: '2px solid #D4AF37',
              boxShadow: '0 0 30px rgba(139, 0, 0, 0.6)',
            }}>
              {isFinal ? '🌹' : '❤'}
            </div>

            {/* Stamp with initial */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-white/80 rounded-sm shadow-md border border-gray-300 flex items-center justify-center">
              <div className="w-10 h-12 border-2 border-dashed border-rose-pink/30 rounded-sm flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-rose-pink">
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
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
              <p className="font-medieval text-xs text-dark-charcoal/60">Letter {letterNumber}</p>
              <p className="font-cursive text-sm text-rose-pink">A Love Letter</p>
            </div>

            {/* Sparkle overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-soft-gold text-lg"
                  initial={{
                    x: Math.random() * 340,
                    y: Math.random() * 240,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    scale: [0, 1, 0.5],
                    opacity: [1, 0.8, 0],
                    y: [null, -20 - Math.random() * 40],
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

            <p className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-sm font-medieval animate-bounce">
              Tap to open 📜
            </p>
          </div>
        </motion.div>
      ) : (
        // ============================================
        // LETTER PAPER - YOUR CUSTOM PAPER IMAGE
        // ============================================
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-lg shadow-2xl overflow-hidden"
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

          <div className="relative p-8 md:p-12">
            {/* Decorative header */}
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-pink" />
                <span className="text-rose-pink">✦</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-pink" />
              </div>
              <p className="font-medieval text-xs text-dark-charcoal/50 mt-2">
                Letter {letterNumber} of {totalLetters}
              </p>
            </div>

            {/* Sender info */}
            <div className="text-center mb-6">
              <p className="font-cursive text-2xl text-rose-pink">From: {letter.from}</p>
              <p className="font-medieval text-xs text-dark-charcoal/40">{letter.relationship}</p>
            </div>

            {/* Letter content */}
            <div className="font-playfair text-dark-charcoal/80 leading-relaxed space-y-4 max-h-[400px] overflow-y-auto">
              {letter.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-sm md:text-base first:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Photos (if any) */}
            {letter.photos && letter.photos.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medieval text-xs text-rose-pink mb-2">📜 Memories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {letter.photos.map((photo, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-rose-pink/20">
                      <img src={photo} alt={`Memory ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Voice message - ONLY for Letter 5 */}
            {letter.voiceMessage && letterNumber === 5 && (
              <div className="mt-6 p-4 bg-white/30 rounded-lg border border-rose-pink/20">
                <h4 className="font-medieval text-xs text-rose-pink mb-2">🎙️ Listen to Their Voice</h4>
                <audio controls className="w-full">
                  <source src={letter.voiceMessage} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Video message - ONLY for Letter 5 */}
            {letter.videoMessage && letterNumber === 5 && (
              <div className="mt-6 p-4 bg-white/30 rounded-lg border border-rose-pink/20">
                <h4 className="font-medieval text-xs text-rose-pink mb-2">🎥 Watch Birthday Message</h4>
                <video controls className="w-full rounded-lg">
                  <source src={letter.videoMessage} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div>
            )}

            {/* Continue button */}
            <div className="mt-8 text-center">
              <button
                onClick={onContinue}
                className="px-8 py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medieval shadow-lg hover:shadow-rose-glow transition-all duration-300 hover:scale-105"
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
