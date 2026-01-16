import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Project from '@/models/Project';
import { requireAuth } from '@/lib/requireAuth';

export async function POST(req: Request) {
    const session = await requireAuth();

    const { name, description } = await req.json();

    if (!name) {
        return NextResponse.json({ error: 'Name is required'}, { status: 400 });
    }

    await connectToDB();

    const project = new Project({
        name,
        description,
        ownerId: session.userId,
    });

    await project.save();

    return NextResponse.json(project, { status: 201 });
}

export async function GET() {
    const session = await requireAuth();

    await connectToDB();

    const projects = await Project.find({
        ownerId: session.userId,
    }).sort({ created: -1 });

    return NextResponse.json(projects);
}