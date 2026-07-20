'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordScreen({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const correctPassword = '2024';

  // Animated glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-submit when 4 digits are entered
  useEffect(() => {
    if (password.length === 4) {
      const timer = setTimeout(() => {
        if (password === correctPassword) {
          onSuccess();
        } else {
          setError(true);
          setTimeout(() => {
            setPassword('');
            setError(false);
          }, 800);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [password, correctPassword, onSuccess]);

  const handleNumberClick = (num) => {
    if (password.length < 4) {
      setPassword(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Glass Tab */}
      <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Glass shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        
        {/* Top glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Bottom glass highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Golden Glowing Circle with Photo */}
          <div className="relative mx-auto mb-4 w-32 h-32">
            <div 
              className="w-32 h-32 rounded-full mx-auto relative overflow-hidden border-4"
              style={{
                borderColor: '#D4AF37',
                boxShadow: `0 0 ${40 * glowIntensity}px rgba(212, 175, 55, 0.5), 0 0 ${80 * glowIntensity}px rgba(212, 175, 55, 0.25)`,
                transition: 'box-shadow 1.5s ease-in-out',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
              }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full -z-10" style={{
              border: '2px solid rgba(212, 175, 55, 0.25)',
              transform: 'scale(1.1)',
            }} />
            <div className="absolute inset-0 rounded-full -z-20" style={{
              border: '2px solid rgba(212, 175, 55, 0.15)',
              transform: 'scale(1.25)',
            }} />
          </div>

          {/* Locked Text */}
          <h2 className="font-cursive text-2xl text-white mb-1">
            🔒 Locked
          </h2>
          <p className="text-white/40 text-xs mb-4 font-light">
            Enter the 4-digit password
          </p>

          {/* Password Dots */}
          <div className="flex justify-center gap-3 mb-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: password[i] ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                  boxShadow: password[i] ? '0 0 15px rgba(212, 175, 55, 0.5)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-shiny-red text-xs mb-3 font-medieval">
              ❌ Incorrect. Try again!
            </p>
          )}

          {/* Number Keypad */}
          <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 active:bg-white/30 transition-colors duration-150 hover:border-soft-gold/50"
              >
                {num}
              </button>
            ))}
            
            <div />
            
            <button
              onClick={() => handleNumberClick('0')}
              className="w-full aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xl font-medieval hover:bg-white/20 active:bg-white/30 transition-colors duration-150 hover:border-soft-gold/50"
            >
              0
            </button>

            <button
              onClick={handleDelete}
              className="w-full aspect-square rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-lg font-medieval hover:bg-white/10 active:bg-white/20 transition-colors duration-150 hover:text-white"
            >
              ⌫
            </button>
          </div>

          <p className="text-white/20 text-[10px] mt-3 font-light">
            Hint: The year of birth
          </p>
        </div>
      </div>
    </div>
  );
}
