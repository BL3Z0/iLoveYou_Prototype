import { motion } from 'framer-motion';

export default function Introduction({ onContinue }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-warm-white to-cream flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-cream/80 backdrop-blur-sm rounded-3xl p-10 shadow-luxury border border-soft-gold/20">
          <div className="text-center mb-8">
            <span className="text-soft-gold text-sm tracking-[0.3em] uppercase font-light">Introduction</span>
            <h2 className="font-serif text-4xl text-burgundy mt-2">A Gift from the Heart</h2>
            <div className="flex justify-center items-center gap-3 mt-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-soft-gold"></div>
              <span className="text-soft-gold">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-soft-gold"></div>
            </div>
          </div>

          <div className="space-y-5 text-dark-charcoal/70 font-light leading-relaxed">
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
            <p className="text-deep-rose font-serif text-xl italic">
              This is my gift to you—a collection of love, carefully wrapped in words.
            </p>
          </div>

          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="px-10 py-4 bg-gradient-to-r from-deep-rose to-burgundy text-white rounded-full font-medium shadow-luxury hover:shadow-rose-glow transition-all duration-300"
            >
              Continue →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
