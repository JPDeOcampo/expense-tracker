import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secure-default-secret"
);

export const validateToken = async (request: NextRequest) => {
  const cookiesToken = request.cookies.get("token");
  const cookiesSessionId = request.cookies.get("sessionId");

  if (!cookiesToken || !cookiesSessionId) {
    return {
      error: { message: "No authentication token", invalidToken: true },
    };
  }

  const token = cookiesToken.value;
  const sessionIdToken = cookiesSessionId.value;

  if (!token || !sessionIdToken) {
    return { error: { message: "Token not found", invalidToken: true } };
  }

  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);

    const userId = payload.id;
    const sessionId = payload.sessionId;

    if (!userId) {
      return { error: { message: "Invalid token", invalidToken: true } };
    }

    return { userId, sessionId, sessionIdToken};
  } catch (error) {
    return { error: { message: "Token verification failed" } };
  }
};

export async function middleware(request: NextRequest) {
  const validationResult = await validateToken(request);

  if (validationResult.error) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/income:path*",
    "/api/expense:path*",
    "/pages/:path*",
  ],
};
