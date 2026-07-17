import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TransitionPage({ type, data }) {
  if (type === 'memory') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100 text-center">
          <h3 className="font-serif text-2xl text-rose-600 mb-6">{data.title}</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {data.collage.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={img}
                  alt={`Memory ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {data.caption && (
            <p className="text-gray-500 font-light italic">{data.caption}</p>
          )}
          
          <motion.div
            className="mt-4 text-rose-300 text-sm"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ ✦ ✦
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (type === 'quote') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100">
          {data.image && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
              <Image
                src={data.image}
                alt="Quote background"
                fill
                className="object-cover"
              />
            </div>
          )}
          <blockquote className="font-serif text-2xl text-rose-600 text-center leading-relaxed">
            "{data.quote}"
          </blockquote>
        </div>
      </motion.div>
    );
  }

  return null;
}