import { getReels } from '@/lib/blob';
import VideoPlayer from '@/components/VideoPlayer';
import WelcomeSplash from '@/components/WelcomeSplash';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const reels = await getReels();

  return (
    <div className="relative h-screen w-full bg-[#f8f9fa] bg-[radial-gradient(#e9ecef_1px,transparent_1px)] [background-size:20px_20px] overflow-hidden">
      <WelcomeSplash />
      <main className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide pb-32">
        {reels.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-800 p-10 text-center">
            <div className="max-w-xs">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-zinc-100">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-zinc-900 tracking-tight">No Content Yet</h1>
              <p className="text-zinc-500 text-sm leading-relaxed">We're preparing something amazing. Please check back later.</p>
            </div>
          </div>
        ) : (
          reels.map((reel) => (
            <section key={reel.id} className="h-screen w-full snap-start snap-always relative flex items-center justify-center p-4 sm:p-10">
              <div className="w-full max-w-[95vw] sm:max-w-[420px] h-[72vh] sm:h-[78vh] relative shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[3rem] overflow-hidden bg-white border-4 border-white transition-all duration-700 ease-in-out hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] mb-12">
                <VideoPlayer driveId={reel.driveId} title={reel.title} />
              </div>
            </section>
          ))
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-zinc-100 z-[100] h-20 px-6 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col items-center gap-1 group cursor-pointer transition-all active:scale-95">
          <div className="p-2 rounded-xl group-hover:bg-zinc-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tighter">Home</span>
        </div>

        <div className="flex flex-col items-center gap-1 group cursor-pointer transition-all active:scale-95">
          <div className="p-2 rounded-xl bg-zinc-900 shadow-lg shadow-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tighter">Reels</span>
        </div>

        <a href="https://wa.me/919321001904" className="flex flex-col items-center gap-1 group cursor-pointer transition-all active:scale-95">
          <div className="p-2 rounded-xl group-hover:bg-green-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.163 1.417 4.773 1.418 5.405 0 9.805-4.399 9.807-9.806.001-2.621-1.02-5.086-2.871-6.938-1.852-1.853-4.318-2.873-6.94-2.873-5.407 0-9.805 4.4-9.808 9.808-.001 1.738.463 3.435 1.343 4.931l-1.077 3.937 4.027-1.057zm11.233-7.258c-.301-.151-1.78-.878-2.056-.978-.275-.1-.476-.151-.675.151-.199.302-.773.978-.948 1.179-.175.201-.35.227-.651.076-.301-.151-1.272-.469-2.422-1.495-.894-.797-1.497-1.782-1.672-2.083-.175-.301-.019-.464.131-.614.135-.134.301-.351.451-.527.151-.176.201-.301.301-.502.1-.201.05-.376-.026-.526-.075-.151-.675-1.631-.925-2.235-.243-.591-.491-.511-.675-.521-.175-.01-.375-.01-.575-.01-.201 0-.526.076-.801.376-.275.301-1.051 1.028-1.051 2.508 0 1.48 1.076 2.911 1.226 3.112.15.201 2.116 3.232 5.126 4.532.716.309 1.274.494 1.708.632.719.228 1.373.196 1.891.119.577-.086 1.78-.727 2.031-1.43.25-.702.25-1.304.175-1.43-.075-.126-.275-.201-.576-.351z"/>
            </svg>
          </div>
          <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tighter">Chat</span>
        </a>

        <a href="mailto:softreasure@gmail.com" className="flex flex-col items-center gap-1 group cursor-pointer transition-all active:scale-95">
          <div className="p-2 rounded-xl group-hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tighter">Email</span>
        </a>

        <a href="tel:+919321001904" className="flex flex-col items-center gap-1 group cursor-pointer transition-all active:scale-95">
          <div className="p-2 rounded-xl group-hover:bg-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tighter">Call</span>
        </a>
      </nav>
    </div>
  );
}
