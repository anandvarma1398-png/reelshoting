'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Reel } from '@/lib/types';

export default function AdminDashboard() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchReels();
  }, []);

  async function fetchReels() {
    const res = await fetch('/api/reels');
    if (res.ok) {
      const data = await res.json();
      setReels(data);
    } else if (res.status === 401) {
      router.push('/admin/login');
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    const res = await fetch('/api/reels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, driveUrl }),
    });

    if (res.ok) {
      setTitle('');
      setDriveUrl('');
      fetchReels();
    } else {
      const errorData = await res.json();
      alert(`ERROR: ${errorData.error}\nDETAILS: ${errorData.details || 'No details available'}`);
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this reel?')) return;

    const res = await fetch(`/api/reels?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchReels();
    } else {
      const errorData = await res.json();
      alert(`DELETE ERROR: ${errorData.error}\nDETAILS: ${errorData.details || 'No details available'}`);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
              R
            </div>
            <span className="text-xl font-bold tracking-tight">Reelhosting</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-400 text-sm">Welcome, <span className="text-white font-medium">Anand</span></span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h2 className="text-xl font-bold mb-6">Upload New Reel</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Product Name</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Premium Silk Saree"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-700"
                  />
                </div>                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Google Drive URL</label>
                  <input
                    value={driveUrl}
                    onChange={(e) => setDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-700"
                  />
                  <p className="mt-2 text-[10px] text-zinc-500 leading-relaxed">
                    Make sure the file is set to "Anyone with the link can view" in Google Drive.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-purple-900/20"
                >
                  {submitting ? 'Processing...' : 'Publish Reel'}
                </button>
              </form>
            </div>
          </div>

          {/* Right: List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold">Your Library</h2>
                <p className="text-zinc-500 text-sm mt-1">Manage your active reels</p>
              </div>
              <span className="text-zinc-500 text-xs font-mono">{reels.length} Reels Total</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1,2,3,4].map(n => (
                  <div key={n} className="h-40 bg-zinc-900 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : reels.length === 0 ? (
              <div className="bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800 p-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">No reels yet</h3>
                <p className="text-zinc-500 max-w-[200px] text-sm mt-2">Upload your first video to see it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reels.map((reel) => (
                  <div key={reel.id} className="group bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all shadow-lg hover:shadow-2xl">
                    <div className="aspect-[9/16] relative bg-zinc-950 overflow-hidden">
                      <iframe
                        src={`https://drive.google.com/file/d/${reel.driveId}/preview`}
                        className="w-full h-full pointer-events-none scale-105"
                        title={reel.title}
                      ></iframe>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <button
                          onClick={() => handleDelete(reel.id)}
                          className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all backdrop-blur-md"
                        >
                          Delete Reel
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm truncate">{reel.title}</h3>
                      <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase">ID: {reel.driveId}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
