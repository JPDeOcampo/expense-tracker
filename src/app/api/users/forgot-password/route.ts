import { NextResponse, NextRequest } from "next/server";
import { sendResetEmail } from "../../../../../libs/mailer";
import connectMongoDB from "../../../../../libs/mongodb";
import Users from "../../../../../models/users";
import crypto from "crypto";

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    await connectMongoDB();

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "Invalid Email",
        invalidEmail: true,
      });
    }
    const resetToken = crypto.randomBytes(4).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000);

    user.resetToken =  resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await sendResetEmail(email, resetToken);

    return NextResponse.json({
      message: "Reset email sent",
      resetToken: resetToken,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
