'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SpecialMemories({ onContinue }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  const containerRef = useRef(null);

  // Sample memories data - Replace with your actual images and videos
  const memories = [
    { type: 'image', src: '/images/memory1.jpg', caption: 'Our First Meeting' },
    { type: 'image', src: '/images/memory2.jpg', caption: 'That Beautiful Day' },
    { type: 'video', src: '/videos/memory1.mp4', caption: 'Our Fun Times' },
    { type: 'image', src: '/images/memory3.jpg', caption: 'Laughing Together' },
    { type: 'video', src: '/videos/memory2.mp4', caption: 'Special Moments' },
  ];

  // Trigger confetti when page loads
  useEffect(() => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        colors: ['#D4AF37', '#EC5598', '#FFD700', '#FF6B6B', '#FFD93D'],
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        colors: ['#D4AF37', '#EC5598', '#FFD700', '#FF6B6B', '#FFD93D'],
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setTimeout(() => setShowConfetti(false), 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1a0000] via-[#4a0000] to-[#8B0000] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Shadow depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
      
      {/* Gold sparkle overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, #D4AF37 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <h2 className="font-cinematic text-3xl md:text-5xl text-soft-gold text-center mb-6 md:mb-8 drop-shadow-2xl">
          ✨ Special Memories ✨
        </h2>

        {/* Carousel Container */}
        <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl border border-soft-gold/20 shadow-2xl overflow-hidden">
          {/* Slide Counter */}
          <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-soft-gold text-sm font-medieval">
            {currentSlide + 1} / {memories.length}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 border border-soft-gold/20 hover:border-soft-gold/50"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 border border-soft-gold/20 hover:border-soft-gold/50"
          >
            ›
          </button>

          {/* Slide Content */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
              >
                {memories[currentSlide].type === 'image' ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <img 
                      src={memories[currentSlide].src} 
                      alt={memories[currentSlide].caption}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    {/* Image caption */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-soft-gold/20">
                      <p className="text-white/90 text-sm md:text-base font-medieval">
                        {memories[currentSlide].caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <video 
                      src={memories[currentSlide].src} 
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      autoPlay
                      muted
                    />
                    {/* Video caption */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-soft-gold/20">
                      <p className="text-white/90 text-sm md:text-base font-medieval">
                        {memories[currentSlide].caption} 🎬
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 py-4">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-soft-gold w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-6 md:mt-8">
          <button
            onClick={onContinue}
            className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-soft-gold to-gold-shimmer text-dark-charcoal rounded-full font-medieval text-lg md:text-xl shadow-2xl hover:shadow-soft-gold/30 transition-all duration-200 active:scale-95"
          >
            Continue to Letters 📜
          </button>
        </div>
      </motion.div>
    </div>
  );
}
