import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string) {
    return bcrypt.compare(password, hashed);
}

export function signToken(payload: { userId: string; role: string }) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string ) {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
}