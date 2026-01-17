import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Project from "@/models/Project";
import { requireAuth } from "@/lib/requireAuth";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await requireAuth();

  await connectToDB();

  const project = await Project.findOne({
    _id: id,
    ownerId: session.userId,
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await project.deleteOne();

  return NextResponse.json({ success: true });
}
