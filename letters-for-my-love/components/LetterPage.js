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
      className="w-full"
    >
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Glass shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        
        {/* Letter header */}
        <div className="bg-white/5 px-8 py-6 border-b border-white/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-purple-300 font-light tracking-wide">
              Letter {letterNumber} of {totalLetters}
            </span>
            <span className="text-white/70 font-serif">From: {letter.from}</span>
          </div>
          {letter.relationship && (
            <p className="text-xs text-white/40 mt-1 font-light tracking-wider">
              {letter.relationship}
            </p>
          )}
        </div>

        {/* Letter content */}
        <div className="p-8">
          {/* Sender photo */}
          {letter.senderPhoto && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400/40 shadow-xl">
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
          <div className="text-white/80 font-light leading-relaxed">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Photos */}
          {letter.photos && letter.photos.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm text-purple-300 font-medium mb-3 tracking-wide">📷 Memories</h4>
              <PhotoGallery photos={letter.photos} />
            </div>
          )}

          {/* Voice message */}
          {letter.voiceMessage && (
            <div className="mt-8">
              <h4 className="text-sm text-purple-300 font-medium mb-3 tracking-wide">🎙️ Listen to Their Voice</h4>
              <AudioPlayer src={letter.voiceMessage} />
            </div>
          )}

          {/* Video message */}
          {letter.videoMessage && (
            <div className="mt-8">
              <h4 className="text-sm text-purple-300 font-medium mb-3 tracking-wide">🎥 Watch Birthday Message</h4>
              <VideoPlayer src={letter.videoMessage} />
            </div>
          )}
        </div>

        {/* Continue button - Optimized for performance */}
<div className="px-8 py-6 bg-white/5 border-t border-white/10 text-center">
  <button
    onClick={onContinue}
    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
  >
    {letterNumber === totalLetters ? '💫 Continue to the Finale' : 'Continue →'}
  </button>
</div>
