'use client';

import { useState, useEffect } from 'react';

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 1000); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[500] flex items-center justify-center bg-white transition-all duration-1000 ease-in-out ${fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
      <div className="flex flex-col items-center">
        {/* Animated Premium Logo */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 rounded-[2rem] sm:rounded-[2.5rem] animate-[ping_3s_infinite] blur-xl sm:blur-2xl opacity-20"></div>
          <div className="relative w-full h-full bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.3)] animate-in zoom-in duration-1000">
            <span className="text-white text-5xl sm:text-6xl font-black italic tracking-tighter">S</span>
          </div>
        </div>

        {/* Animated Brand Name */}
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-[0.2em] text-zinc-900 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            SOFTREASURE
          </h1>
          <div className="flex items-center gap-3 sm:gap-4 animate-in fade-in duration-1000 delay-700">
            <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-zinc-200"></div>
            <p className="text-[10px] sm:text-[12px] font-black text-zinc-400 uppercase tracking-[0.3em] sm:tracking-[0.4em]">The Premium Store</p>
            <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-zinc-200"></div>
          </div>
        </div>
      </div>

      {/* Luxury Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100/50 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>
    </div>
  );
}
