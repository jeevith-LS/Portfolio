import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined;
    const search = searchParams.get('search') || undefined;

    const projects = db.getProjects({ category, featured, search });
    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and category are required fields' },
        { status: 400 }
      );
    }

    const newProject = db.addProject({
      title: body.title,
      tagline: body.tagline || body.title,
      description: body.description,
      category: body.category,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map((t: string) => t.trim()) : ['Full-Stack']),
      metrics: body.metrics || 'Production Ready',
      liveUrl: body.liveUrl || 'https://github.com',
      githubUrl: body.githubUrl || 'https://github.com',
      featured: Boolean(body.featured),
      architectureDetails: body.architectureDetails || 'Modular Next.js and API architecture.',
      imageColor: body.imageColor || 'from-cyan-500/20 to-blue-600/30'
    });

    return NextResponse.json({ success: true, message: 'Project created successfully', data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
