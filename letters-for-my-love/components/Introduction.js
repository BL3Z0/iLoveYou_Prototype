import { motion } from 'framer-motion';
import GlassFrame from './GlassFrame';

export default function Introduction({ onContinue }) {
  return (
    <GlassFrame>
      <div className="text-center mb-8">
        <span className="text-purple-300 text-sm tracking-[0.3em] uppercase font-light">Introduction</span>
        <h2 className="font-serif text-4xl text-white mt-2">A Gift from the Heart</h2>
        <div className="flex justify-center items-center gap-3 mt-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400/50"></div>
          <span className="text-purple-300">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/50"></div>
        </div>
      </div>

      <div className="space-y-5 text-white/70 font-light leading-relaxed">
        <p className="text-lg">
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
        <p className="text-purple-300 font-serif text-xl italic">
          This is my gift to you—a collection of love, carefully wrapped in words.
        </p>
      </div>

      <div className="mt-10 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
        >
          Continue →
        </motion.button>
      </div>
    </GlassFrame>
  );
}
