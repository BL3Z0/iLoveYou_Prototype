// Create placeholder - Copy full code from the guide 
// components/VideoPlayer.js
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoPlayer({ src }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      videoRef.current?.play();
      setIsPlaying(true);
    }, 300);
  };

  const closeModal = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-full aspect-video bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center hover:shadow-lg transition-shadow"
      >
        <div className="text-center">
          <div className="text-5xl mb-2">▶️</div>
          <p className="text-rose-600 font-medium">Click to watch</p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={src}
                className="w-full h-full rounded-lg"
                controls
                playsInline
              />
              <button
                onClick={closeModal}
                className="absolute -top-10 right-0 text-white hover:text-rose-300 transition-colors"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}