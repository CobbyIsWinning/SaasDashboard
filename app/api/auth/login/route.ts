import connectToDB from "@/lib/db";
import User from "@/models/User";
import { verifyPassword, signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectToDB();

  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ userId: user._id.toString(), role: user.role });

  const res = NextResponse.json({ success: true });
  res.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
