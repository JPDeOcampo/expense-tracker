import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../../../models/users";
import * as cookie from "cookie";

const SECRET_KEY = process.env.JWT_SECRET || "your-secure-default-secret";

if (SECRET_KEY === "your-secure-default-secret") {
  console.warn(
    "Warning: Using default secret key. Please set the JWT_SECRET environment variable!"
  );
}

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    await connectMongoDB();

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { token, id: user._id },
      { status: 200 }
    );
    
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
