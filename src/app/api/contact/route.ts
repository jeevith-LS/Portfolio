import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const messages = db.getMessages();
    return NextResponse.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const savedMessage = db.addMessage({
      name: body.name,
      email: body.email,
      subject: body.subject || 'Portfolio Inquery',
      message: body.message
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message received and stored in database successfully! I will respond promptly.',
        data: savedMessage
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact message', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
