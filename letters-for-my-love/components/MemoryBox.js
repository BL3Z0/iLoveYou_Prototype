import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { lettersData } from '../data/letters';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import GlassFrame from './GlassFrame';

export default function MemoryBox({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activeTab, setActiveTab] = useState('letters');

  const allPhotos = lettersData.flatMap(letter => 
    letter.photos ? letter.photos.map(photo => ({ ...photo, from: letter.from })) : []
  );

  const allAudio = lettersData.filter(letter => letter.voiceMessage).map(letter => ({
    from: letter.from,
    src: letter.voiceMessage,
    relationship: letter.relationship
  }));

  const allVideos = lettersData.filter(letter => letter.videoMessage).map(letter => ({
    from: letter.from,
    src: letter.videoMessage,
    relationship: letter.relationship
  }));

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <GlassFrame>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="text-purple-300 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="font-serif text-3xl md:text-4xl text-white">
              💜 Memory Box
            </h1>
            <div className="w-16"></div>
          </div>
          <p className="text-white/50 font-light">
            All the love, all the memories, all in one place.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {['letters', 'photos', 'audio', 'videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {tab === 'letters' && '📝 Letters'}
              {tab === 'photos' && '📷 Photos'}
              {tab === 'audio' && '🎙️ Audio'}
              {tab === 'videos' && '🎥 Videos'}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'letters' && (
            <motion.div
              key="letters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {lettersData.map((letter, index) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-400/30 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
                  onClick={() => setSelectedLetter(letter)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {letter.senderPhoto && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-400/30">
                          <Image
                            src={letter.senderPhoto}
                            alt={letter.from}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-white">{letter.from}</h3>
                        <p className="text-sm text-purple-300/60">{letter.relationship}</p>
                      </div>
                    </div>
                    
                    <p className="text-white/60 text-sm line-clamp-3 font-light">
                      {letter.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex gap-2 mt-4 text-xs text-purple-300">
                      {letter.voiceMessage && <span>🎙️</span>}
                      {letter.videoMessage && <span>🎥</span>}
                      {letter.photos && letter.photos.length > 0 && <span>📷 {letter.photos.length}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {allPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group border border-white/10 hover:border-purple-400/30"
                >
                  <Image
                    src={photo}
                    alt={`Memory from ${photo.from}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium">{photo.from}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'audio' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              {allAudio.map((audio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                      🎙️
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{audio.from}</h4>
                      <p className="text-sm text-purple-300/60">{audio.relationship}</p>
                    </div>
                  </div>
                  <AudioPlayer src={audio.src} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {allVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                      🎥
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{video.from}</h4>
                      <p className="text-sm text-purple-300/60">{video.relationship}</p>
                    </div>
                  </div>
                  <VideoPlayer src={video.src} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </GlassFrame>

      {/* Letter Detail Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="float-right text-white/40 hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
                
                <div className="mb-6">
                  <h2 className="font-serif text-2xl text-white">From: {selectedLetter.from}</h2>
                  <p className="text-purple-300/60 text-sm">{selectedLetter.relationship}</p>
                </div>
                
                <div className="text-white/80 font-light leading-relaxed">
                  {selectedLetter.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>

                {selectedLetter.photos && selectedLetter.photos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm text-purple-300 font-medium mb-3">📷 Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedLetter.photos.map((photo, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                          <Image src={photo} alt={`Memory ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLetter.voiceMessage && (
                  <div className="mt-6">
                    <h4 className="text-sm text-purple-300 font-medium mb-3">🎙️ Voice Message</h4>
                    <AudioPlayer src={selectedLetter.voiceMessage} />
                  </div>
                )}

                {selectedLetter.videoMessage && (
                  <div className="mt-6">
                    <h4 className="text-sm text-purple-300 font-medium mb-3">🎥 Video Message</h4>
                    <VideoPlayer src={selectedLetter.videoMessage} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
