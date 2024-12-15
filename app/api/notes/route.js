import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Note from '../../../models/Note';

export async function GET() {
  try {
    await dbConnect();
    const note = await Note.findOne().sort({ lastModified: -1 });
    return NextResponse.json({ note });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { content } = await request.json();
    await dbConnect();
    
    const note = await Note.create({
      content,
      lastModified: new Date(),
    });
    
    return NextResponse.json({ note });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save note' }, { status: 500 });
  }
}
