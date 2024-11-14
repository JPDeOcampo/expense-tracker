import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Users from "../../../../../models/users";
import bcrypt from "bcrypt";
import * as cookie from "cookie";

export const POST = async (request: NextRequest) => {
  const cookiesToken = request.cookies.get("reset-token");

  try {
    const { password, reEnterPassword } = await request.json();

    await connectMongoDB();

    const user = await Users.findOne({ resetToken: cookiesToken?.value });

    if (password !== reEnterPassword) {
      return NextResponse.json({
        message: "Password must match",
        invalidPassword: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    
    const response = NextResponse.json({
      message: "Reset password success",
    });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("reset-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
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
