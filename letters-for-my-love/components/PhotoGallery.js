// Create placeholder - Copy full code from the guide 
// components/PhotoGallery.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PhotoGallery({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-2 gap-2">
          {photos.slice(0, 4).map((photo, index) => (
            <div
              key={index}
              className={`relative ${
                index === 0 ? 'col-span-2' : ''
              } aspect-square cursor-pointer overflow-hidden rounded-lg`}
              onClick={() => {
                setCurrentIndex(index);
                setIsLightboxOpen(true);
              }}
            >
              <Image
                src={photo}
                alt={`Memory ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        {photos.length > 4 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            +{photos.length - 4} more
          </div>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-auto max-h-[80vh]">
                <Image
                  src={photos[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}