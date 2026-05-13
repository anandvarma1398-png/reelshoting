'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
  driveId: string;
  title: string;
}

export default function VideoPlayer({ driveId, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const preText = `I want more information about ${title}.`;

  const shareWhatsApp = () => {
    const message = `${preText}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareEmail = () => {
    const body = `${preText}`;
    window.location.href = `mailto:softreasure@gmail.com?subject=${encodeURIComponent('Inquiry: ' + title)}&body=${encodeURIComponent(body)}`;
  };

  const handleCall = () => {
    window.location.href = 'tel:+919321001904';
  };

  const scrollUp = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Video Area */}
      <div className="relative flex-grow bg-zinc-950 overflow-hidden rounded-[2.5rem] m-2 shadow-2xl">
        {(!isInView || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-20">
            {isLoading && isInView ? (
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Loading</span>
              </div>
            ) : (
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </div>
            )}
          </div>
        )}

        {isInView && (
          <iframe
            src={`https://drive.google.com/file/d/${driveId}/preview`}
            className="w-full h-full border-none pointer-events-auto scale-[1.03]"
            allow="autoplay"
            title={title}
            onLoad={() => setIsLoading(false)}
          ></iframe>
        )}

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 border-2 border-white/20 flex items-center justify-center text-white font-black text-lg shadow-2xl shadow-purple-500/20">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-base tracking-tight drop-shadow-xl uppercase italic">Softreasure</span>
              <span className="text-xs text-white/60 font-bold tracking-wider uppercase">Premium Store</span>
            </div>
          </div>
          
          <h2 className="text-white text-sm font-semibold line-clamp-2 max-w-[85%] leading-relaxed drop-shadow-lg mb-2 pl-1 border-l-2 border-red-500">
            {title}
          </h2>
        </div>

        {/* Side Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-30">
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setLiked(!liked)}
              className="pointer-events-auto transition-transform active:scale-50 duration-500"
            >
              <div className={`p-3.5 rounded-full backdrop-blur-3xl border border-white/10 transition-all ${liked ? 'bg-red-500/90 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/10 hover:bg-white/20'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${liked ? 'fill-white text-white' : 'fill-none text-white'}`} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </button>
            <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-red-500 w-3/4 animate-pulse"></div>
            </div>
          </div>

          <button onClick={shareWhatsApp} className="pointer-events-auto transition-all active:scale-75">
            <div className="p-3.5 bg-green-700/90 backdrop-blur-3xl rounded-full border border-white/10 shadow-xl hover:bg-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </button>

          <button onClick={shareEmail} className="pointer-events-auto transition-all active:scale-75">
            <div className="p-3.5 bg-green-700/90 backdrop-blur-3xl rounded-full border border-white/10 shadow-xl hover:bg-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </button>

          <button onClick={handleCall} className="pointer-events-auto transition-all active:scale-75">
            <div className="p-3.5 bg-green-700/90 backdrop-blur-3xl rounded-full border border-white/10 shadow-xl hover:bg-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
