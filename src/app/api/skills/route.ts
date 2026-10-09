import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const skills = db.getSkills();
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
