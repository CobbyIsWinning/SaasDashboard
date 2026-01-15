import connectToDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST (req: Request) {
    const { email, password, name } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDB();

    const existing = await User.findOne({ email });
    if (existing) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashed = await hashPassword(password);

    const user = new User({ 
        email, 
        password: hashed, 
        name });

    const token = signToken({ userId: user._id.toString(), role: user.role });

    const res = NextResponse.json({ message: 'User created', token });
    res.cookies.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });

    return res;
}