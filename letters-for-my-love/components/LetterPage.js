'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import PhotoGallery from './PhotoGallery';

export default function LetterPage({ letter, letterNumber, totalLetters, onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto px-3 md:px-0"
    >
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative">
        {/* Glass shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        
        {/* Letter header */}
        <div className="bg-white/5 px-4 md:px-8 py-4 md:py-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
            <span className="text-rose-pink font-light tracking-wide text-xs md:text-sm">
              Letter {letterNumber} of {totalLetters}
            </span>
            <span className="text-white/70 font-serif text-sm md:text-base">From: {letter.from}</span>
          </div>
          {letter.relationship && (
            <p className="text-xs text-white/40 mt-1 font-light tracking-wider text-center sm:text-left">
              {letter.relationship}
            </p>
          )}
        </div>

        {/* Letter content */}
        <div className="p-4 md:p-8">
          {/* Sender photo */}
          {letter.senderPhoto && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-rose-pink/40 shadow-xl">
                <Image
                  src={letter.senderPhoto}
                  alt={letter.from}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Letter text */}
          <div className="text-white/80 font-light leading-relaxed text-sm md:text-base">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 md:mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Photos */}
          {letter.photos && letter.photos.length > 0 && (
            <div className="mt-6 md:mt-8">
              <h4 className="text-sm text-rose-pink font-medium mb-3 tracking-wide">📷 Memories</h4>
              <PhotoGallery photos={letter.photos} />
            </div>
          )}

          {/* Voice message - ONLY for Letter 5 */}
          {letter.voiceMessage && letterNumber === 5 && (
            <div className="mt-6 md:mt-8">
              <h4 className="text-sm text-rose-pink font-medium mb-3 tracking-wide">🎙️ Listen to Their Voice</h4>
              <AudioPlayer src={letter.voiceMessage} />
            </div>
          )}

          {/* Video message - ONLY for Letter 5 */}
          {letter.videoMessage && letterNumber === 5 && (
            <div className="mt-6 md:mt-8">
              <h4 className="text-sm text-rose-pink font-medium mb-3 tracking-wide">🎥 Watch Birthday Message</h4>
              <VideoPlayer src={letter.videoMessage} />
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="px-4 md:px-8 py-4 md:py-6 bg-white/5 border-t border-white/10 text-center">
          <button
            onClick={onContinue}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-rose-pink to-shiny-red text-white rounded-full font-medium shadow-lg hover:shadow-rose-glow transition-all duration-200 active:scale-95 text-sm md:text-base"
          >
            {letterNumber === totalLetters ? '💫 Continue to the Finale' : 'Continue →'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
