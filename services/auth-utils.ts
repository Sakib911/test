'use server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN } from '@/lib/Constants';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function generateToken(payload: Record<string, unknown>) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  return token;
}

export async function setSessionToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function getUser(token: string) {
  const cookieStore = await cookies();
  return cookieStore;
}

export async function clearSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
}

export async function createSession(user: Record<string, unknown>) {
  const token = await generateToken({
    userId: user.id,
    email: user.email,
  });
  await setSessionToken(token);
  return token;
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN)?.value;
  return token || null;
}
