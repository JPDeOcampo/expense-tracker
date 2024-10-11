import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export const POST = async () => {

  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  
  response.headers.set('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire the cookie
    path: '/',
  }));

  return response;
}
