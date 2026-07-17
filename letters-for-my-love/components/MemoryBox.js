import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { lettersData } from '../data/letters';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

export default function MemoryBox({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activeTab, setActiveTab] = useState('letters'); // 'letters', 'photos', 'audio', 'videos'

  // Collect all photos from all letters
  const allPhotos = lettersData.flatMap(letter => 
    letter.photos ? letter.photos.map(photo => ({ ...photo, from: letter.from })) : []
  );

  // Collect all audio messages
  const allAudio = lettersData.filter(letter => letter.voiceMessage).map(letter => ({
    from: letter.from,
    src: letter.voiceMessage,
    relationship: letter.relationship
  }));

  // Collect all videos
  const allVideos = lettersData.filter(letter => letter.videoMessage).map(letter => ({
    from: letter.from,
    src: letter.videoMessage,
    relationship: letter.relationship
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="text-rose-400 hover:text-rose-600 transition-colors"
            >
              ← Back
            </button>
            <h1 className="font-serif text-3xl md:text-4xl text-rose-700">
              💝 Memory Box
            </h1>
            <div className="w-16"></div>
          </div>
          <p className="text-gray-500 font-light">
            All the love, all the memories, all in one place.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {['letters', 'photos', 'audio', 'videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-rose-400 text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-rose-50'
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
                  className="bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedLetter(letter)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {letter.senderPhoto && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={letter.senderPhoto}
                            alt={letter.from}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">{letter.from}</h3>
                        <p className="text-sm text-gray-400">{letter.relationship}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 font-light">
                      {letter.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex gap-2 mt-4 text-xs text-rose-400">
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
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <Image
                    src={photo}
                    alt={`Memory from ${photo.from}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  className="bg-white rounded-xl p-6 shadow-md border border-rose-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-400">
                      🎙️
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{audio.from}</h4>
                      <p className="text-sm text-gray-400">{audio.relationship}</p>
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
                  className="bg-white rounded-xl p-4 shadow-md border border-rose-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-400">
                      🎥
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{video.from}</h4>
                      <p className="text-sm text-gray-400">{video.relationship}</p>
                    </div>
                  </div>
                  <VideoPlayer src={video.src} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Letter Detail Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="float-right text-gray-400 hover:text-rose-400 transition-colors text-xl"
                >
                  ✕
                </button>
                
                <div className="mb-6">
                  <h2 className="font-serif text-2xl text-rose-600">From: {selectedLetter.from}</h2>
                  <p className="text-gray-400 text-sm">{selectedLetter.relationship}</p>
                </div>
                
                <div className="prose prose-rose max-w-none font-light text-gray-700">
                  {selectedLetter.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>

                {/* Show media in modal */}
                {selectedLetter.photos && selectedLetter.photos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm text-rose-400 mb-3">📷 Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedLetter.photos.map((photo, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image src={photo} alt={`Memory ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLetter.voiceMessage && (
                  <div className="mt-6">
                    <h4 className="text-sm text-rose-400 mb-3">🎙️ Voice Message</h4>
                    <AudioPlayer src={selectedLetter.voiceMessage} />
                  </div>
                )}

                {selectedLetter.videoMessage && (
                  <div className="mt-6">
                    <h4 className="text-sm text-rose-400 mb-3">🎥 Video Message</h4>
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