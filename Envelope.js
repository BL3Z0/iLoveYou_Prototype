// Create placeholder - Copy full code from the guide 
// components/Introduction.js
import { motion } from 'framer-motion';

export default function Introduction({ onContinue }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-rose-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-rose-100">
          <div className="text-center mb-8">
            <span className="text-rose-300 text-sm tracking-widest uppercase font-light">Introduction</span>
            <h2 className="font-serif text-3xl text-rose-700 mt-2">A Gift from the Heart</h2>
          </div>

          <div className="space-y-4 text-gray-600 font-light leading-relaxed">
            <p>
              My love, I created this for you because you deserve to know just how much you're loved.
            </p>
            <p>
              I reached out to the people who matter most in your life—the ones who have watched you grow,
              laughed with you, cried with you, and cheered you on.
            </p>
            <p>
              Each letter you're about to read comes from a different heart. Each one shares a unique
              perspective on who you are and why you're so special.
            </p>
            <p className="text-rose-500">
              This is my gift to you—a collection of love, carefully wrapped in words.
            </p>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="px-8 py-3 bg-rose-400 text-white rounded-full font-medium hover:bg-rose-500 transition-all duration-300 shadow-md"
            >
              Continue →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}