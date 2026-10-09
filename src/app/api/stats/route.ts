import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const stats = db.getStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch telemetry stats', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
