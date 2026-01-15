import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/lib/requireAuth";

export async function GET() {
  const session = await requireAuth();

  await connectToDB();

  const user = await User.findById(session.userId);

  return NextResponse.json({
    id: user?._id,
    email: user?.email,
    role: user?.role,
  });
}
