import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function CelebrationEnding({ onViewMemoryBox }) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const heartsInterval = useRef(null);

  useEffect(() => {
    // Trigger confetti
    const duration = 5 * 1000;
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

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        colors: ['#C9184A', '#800F2F', '#D4AF37', '#FF8FA3', '#F5D6A8'],
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        colors: ['#C9184A', '#800F2F', '#D4AF37', '#FF8FA3', '#F5D6A8'],
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Show content after confetti starts
    setTimeout(() => setShowContent(true), 2000);

    // Stop confetti after 8 seconds
    setTimeout(() => setShowConfetti(false), 8000);

    // Create floating hearts
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.bottom = '-20px';
      heart.style.fontSize = Math.random() * 40 + 20 + 'px';
      heart.style.opacity = Math.random() * 0.6 + 0.2;
      heart.style.animation = `floatHeart ${Math.random() * 6 + 4}s linear forwards`;
      heart.style.zIndex = '0';
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 10000);
    };

    heartsInterval.current = setInterval(createHeart, 300);

    return () => {
      clearInterval(interval);
      clearInterval(heartsInterval.current);
      document.querySelectorAll('[style*="floatHeart"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-charcoal via-burgundy to-deep-rose flex items-center justify-center px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-110vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes shimmerText {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .shimmer-gold {
          background: linear-gradient(90deg, #D4AF37, #F5D6A8, #D4AF37, #F5D6A8, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 3s linear infinite;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.9 }}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="bg-cream/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-soft-gold/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="font-serif text-4xl md:text-5xl text-burgundy mb-4"
          >
            Five letters.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="font-serif text-4xl md:text-5xl text-deep-rose mb-2"
          >
            Five beautiful hearts.
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="font-serif text-3xl md:text-4xl text-soft-gold mb-6"
          >
            One unforgettable birthday.
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.7, type: "spring", stiffness: 200 }}
            className="text-7xl mb-6"
          >
            💝
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="text-3xl font-serif text-burgundy mb-2"
          >
            Happy 20th Birthday.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3 }}
            className="text-2xl text-deep-rose font-serif italic mb-8"
          >
            I love you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6 }}
            className="text-xl shimmer-gold font-serif mb-10"
          >
            Forever.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewMemoryBox}
            className="px-8 py-4 bg-gradient-to-r from-deep-rose to-burgundy text-white rounded-full text-lg font-medium shadow-luxury hover:shadow-rose-glow transition-all duration-300"
          >
            📦 Open Memory Box
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
