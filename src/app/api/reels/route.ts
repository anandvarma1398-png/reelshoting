import { addReel, deleteReel, getReels } from '@/lib/blob';
import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const reels = await getReels();
  return NextResponse.json(reels);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, driveUrl } = await request.json();
    
    // Extract drive ID from URL
    const driveIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || driveUrl.match(/id=([a-zA-Z0-9_-]+)/);
    const driveId = driveIdMatch ? driveIdMatch[1] : null;

    if (!driveId) {
      return NextResponse.json({ error: 'Invalid Google Drive URL' }, { status: 400 });
    }

    await addReel({ title, driveId });
    return NextResponse.json({ message: 'Reel added' });
  } catch (error: any) {
    console.error('CRITICAL: Failed to add reel:', error);
    return NextResponse.json({ 
      error: 'Failed to add reel', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  try {
    console.log('Attempting to delete reel with ID:', id);
    await deleteReel(id);
    return NextResponse.json({ message: 'Reel deleted' });
  } catch (error: any) {
    console.error('CRITICAL: Failed to delete reel:', error);
    return NextResponse.json({ 
      error: 'Failed to delete reel',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
