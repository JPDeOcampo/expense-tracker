import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Users from "../../../../../models/users";
import * as cookie from "cookie";

export const POST = async (request: NextRequest) => {
  try {
    const { token } = await request.json();

    await connectMongoDB();

    const verifyCode = await Users.findOne({ resetToken: token });
 
    if (!verifyCode || verifyCode.resetTokenExpires < Date.now()) {
      return NextResponse.json({
        message: "Invalid Code",
        invalidCode: true,
      });
    }

    const response = NextResponse.json({
      message: "Code Verified",
    });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("reset-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
        path: "/",
      })
    );

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
