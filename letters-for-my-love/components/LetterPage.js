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
      transition={{ duration: 0.6 }}
      className="max-w-2xl w-full"
    >
      <div className="bg-cream/95 backdrop-blur-sm rounded-3xl shadow-luxury overflow-hidden border border-soft-gold/20">
        {/* Letter header */}
        <div className="bg-gradient-to-r from-deep-rose/10 via-cream to-deep-rose/5 px-8 py-6 border-b border-soft-gold/20">
          <div className="flex justify-between items-center text-sm">
            <span className="text-deep-rose font-light tracking-wide">
              Letter {letterNumber} of {totalLetters}
            </span>
            <span className="text-burgundy font-serif">From: {letter.from}</span>
          </div>
          {letter.relationship && (
            <p className="text-xs text-dark-charcoal/50 mt-1 font-light tracking-wider">
              {letter.relationship}
            </p>
          )}
        </div>

        {/* Letter content */}
        <div className="p-8">
          {/* Sender photo */}
          {letter.senderPhoto && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-soft-gold/40 shadow-luxury">
                <Image
                  src={letter.senderPhoto}
                  alt={letter.from}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Letter text */}
          <div className="prose prose-rose max-w-none font-light leading-relaxed text-dark-charcoal/80">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Photos */}
          {letter.photos && letter.photos.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm text-deep-rose font-medium mb-3 tracking-wide">📷 Memories</h4>
              <PhotoGallery photos={letter.photos} />
            </div>
          )}

          {/* Voice message */}
          {letter.voiceMessage && (
            <div className="mt-8">
              <h4 className="text-sm text-deep-rose font-medium mb-3 tracking-wide">🎙️ Listen to Their Voice</h4>
              <AudioPlayer src={letter.voiceMessage} />
            </div>
          )}

          {/* Video message */}
          {letter.videoMessage && (
            <div className="mt-8">
              <h4 className="text-sm text-deep-rose font-medium mb-3 tracking-wide">🎥 Watch Birthday Message</h4>
              <VideoPlayer src={letter.videoMessage} />
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="px-8 py-6 bg-gradient-to-r from-deep-rose/5 via-cream to-deep-rose/5 border-t border-soft-gold/20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="px-8 py-3 bg-gradient-to-r from-deep-rose to-burgundy text-white rounded-full font-medium shadow-luxury hover:shadow-rose-glow transition-all duration-300"
          >
            {letterNumber === totalLetters ? '💫 Continue to the Finale' : 'Continue →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
