import connectToDB from "@/lib/db";
import Project from "@/models/Project";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  const user = await User.findOne();
  if (!user) return NextResponse.json({ success: false, error: "No user found" });

  const project = await Project.create({
    name: "Test Project",
    ownerId: user._id as any,
  });

  const projects = await Project.find();

  return NextResponse.json({ success: true, createdProject: project, totalProjects: projects.length });
}
