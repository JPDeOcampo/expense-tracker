import { NextResponse } from "next/server";
import * as jose from "jose";

export const GET = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    await jose.jwtVerify(token, SECRET_KEY);
    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};
