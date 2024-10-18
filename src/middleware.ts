import { NextResponse } from "next/server";
import * as jose from "jose";
import * as cookie from "cookie";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secure-default-secret"
);

export const validateToken = async (request: Request) => {
  const cookies = request.headers.get("cookie");
  if (!cookies) {
    return {
      error: { message: "No authentication token", invalidToken: true },
    };
  }

  const { token } = cookie.parse(cookies || "");
  if (!token) {
    return { error: { message: "Token not found", invalidToken: true } };
  }

  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    const userId = payload.id;

    if (!userId) {
      return { error: { message: "Invalid token", invalidToken: true } };
    }

    return { userId };
  } catch (err) {
    return { error: { message: "Token verification failed" } };
  }
};

export async function middleware(request: Request) {
  const validationResult = await validateToken(request);

  if (validationResult.error) {
    return NextResponse.json(validationResult.error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/dashboard",
    "/api/income/add-income",
    "/api/income/fetch-income",
    "/api/expense/add-expense",
    "/api/expense/fetch-expense",
  ],
};
