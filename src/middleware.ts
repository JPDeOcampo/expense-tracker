import { NextResponse } from 'next/server';
import * as jose from 'jose';
import * as cookie from 'cookie';

export async function middleware(req: Request) {
  console.log('Incoming request to:', req.url);

  // Extract JWT from Authorization header
  // const token = req.headers.get('Authorization')?.split(' ')[1];
  const cookies = req.headers.get('cookie');
  const { token } = cookie.parse(cookies || '');
  
  if (!token) {
    console.log('No token found, redirecting to login.');
    return NextResponse.redirect(new URL('/', req.url)); 
  }

  const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "your-secure-default-secret");

  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    console.log('Token verified:', payload); 
    return NextResponse.next(); // Allow access to the route
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/api/income', '/api/dashboard'], 
};

