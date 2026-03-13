import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { put, getDownloadUrl } from '@vercel/blob';
import { jwtVerify } from 'jose';

export async function POST(request: NextRequest) {
  // Auth check — only logged-in admins can upload
  const token = request.cookies.get('admin_session')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
  }

  // Try public access first; fall back to private + download URL
  let url: string;
  try {
    const blob = await put(`thoughts/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });
    url = blob.url;
  } catch {
    const blob = await put(`thoughts/${Date.now()}-${file.name}`, file, {
      access: 'private',
    });
    url = await getDownloadUrl(blob.url);
  }

  return NextResponse.json({ url });
}
