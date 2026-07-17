// Create placeholder - Copy full code from the guide 
// components/LetterPage.js
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
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100">
        {/* Letter header */}
        <div className="bg-gradient-to-r from-rose-50 to-ivory px-8 py-6 border-b border-rose-100">
          <div className="flex justify-between items-center text-sm text-rose-400">
            <span>Letter {letterNumber} of {totalLetters}</span>
            <span>From: {letter.from}</span>
          </div>
          {letter.relationship && (
            <p className="text-xs text-gray-400 mt-1">{letter.relationship}</p>
          )}
        </div>

        {/* Letter content */}
        <div className="p-8">
          {/* Sender photo */}
          {letter.senderPhoto && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-rose-200 shadow-lg">
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
          <div className="prose prose-rose max-w-none font-light leading-relaxed text-gray-700">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Photos */}
          {letter.photos && letter.photos.length > 0 && (
            <div className="mt-8">
              <PhotoGallery photos={letter.photos} />
            </div>
          )}

          {/* Voice message */}
          {letter.voiceMessage && (
            <div className="mt-8">
              <h4 className="text-sm text-rose-400 mb-3">🎙 Listen to Their Voice</h4>
              <AudioPlayer src={letter.voiceMessage} />
            </div>
          )}

          {/* Video message */}
          {letter.videoMessage && (
            <div className="mt-8">
              <h4 className="text-sm text-rose-400 mb-3">🎥 Watch Birthday Message</h4>
              <VideoPlayer src={letter.videoMessage} />
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="px-8 py-6 bg-rose-50/50 border-t border-rose-100 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="px-8 py-3 bg-rose-400 text-white rounded-full font-medium hover:bg-rose-500 transition-all duration-300 shadow-md"
          >
            {letterNumber === totalLetters ? 'Continue to the Finale 💫' : 'Continue →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}