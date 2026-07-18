import { motion } from 'framer-motion';

export default function GlassFrame({ children, className = '', isNightMode = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative ${className}`}
    >
      {/* Glass frame with blur effect */}
      <div className={`relative backdrop-blur-xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-700 ${
        isNightMode 
          ? 'bg-black/30 border-white/10' 
          : 'bg-white/10 border-white/20'
      }`}>
        {/* Glass shimmer overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
          isNightMode 
            ? 'from-white/5 via-transparent to-white/2' 
            : 'from-white/10 via-transparent to-white/5'
        } pointer-events-none`} />
        
        {/* Top glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Bottom glass highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 p-8 md:p-12">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
