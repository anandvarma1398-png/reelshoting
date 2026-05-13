import { put, list } from '@vercel/blob';
import { Reel } from './types';

const REELS_FILENAME = 'reels.json';
// Using the token directly to ensure it works regardless of Vercel env syncing
const BLOB_TOKEN = 'vercel_blob_rw_nwNLodZwOZLk8i95_T4OiSWpCAUkquDwVFjHxeRsfhi1uZI';

export async function getReels(): Promise<Reel[]> {
  try {
    const { blobs } = await list({ token: BLOB_TOKEN });
    const reelsBlob = blobs.find((b) => b.pathname === REELS_FILENAME);
    
    if (!reelsBlob) {
      console.log('No reels.json found in blob storage.');
      return [];
    }

    const response = await fetch(`${reelsBlob.url}?t=${Date.now()}`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Error fetching reels:', error);
    return [];
  }
}

export async function saveReels(reels: Reel[]): Promise<string> {
  try {
    const { url } = await put(REELS_FILENAME, JSON.stringify(reels), {
      access: 'public',
      addRandomSuffix: false, // Keep the filename consistent
      allowOverwrite: true,  // Explicitly allow overwriting the existing reels.json
      contentType: 'application/json',
      token: BLOB_TOKEN,
    });
    return url;
  } catch (error) {
    console.error('Error saving reels to blob:', error);
    throw error;
  }
}

export async function addReel(reel: Omit<Reel, 'id' | 'createdAt'>): Promise<void> {
  try {
    const reels = await getReels();
    const newReel: Reel = {
      ...reel,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: Date.now(),
    };
    reels.unshift(newReel);
    await saveReels(reels);
  } catch (error) {
    console.error('Error adding reel:', error);
    throw error;
  }
}

export async function deleteReel(id: string): Promise<void> {
  try {
    const reels = await getReels();
    const updatedReels = reels.filter(r => r.id !== id);
    if (reels.length === updatedReels.length) return;
    await saveReels(updatedReels);
  } catch (error) {
    console.error('Error deleting reel:', error);
    throw error;
  }
}
