import { NextRequest,NextResponse } from 'next/server';
import * as cookie from 'cookie';
import Users from '../../../../../models/users';

export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();
  await Users.findByIdAndUpdate(userId, { sessionId: null });
  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  response.headers.set('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire the cookie
    path: '/',
  }));

  return response;
}
