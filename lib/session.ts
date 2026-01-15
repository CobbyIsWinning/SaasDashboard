import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';


export async function getSession() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session');
    if(!cookie) return null;

    try {
        return verifyToken(cookie.value);
    } catch{
        return null;
    }
}