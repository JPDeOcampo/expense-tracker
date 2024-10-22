import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Users from "../../../../../models/users";
import bcrypt from "bcrypt";
import { validateToken } from "@/middleware";

export const PUT = async (request: NextRequest) => {
  try {
    const { oldPassword, newPassword, reEnterPassword } = await request.json(); 

    if (!oldPassword || !newPassword || !reEnterPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const validationResponse = await validateToken(request);

    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    const { userId } = validationResponse;

    await connectMongoDB();

    const user = await Users.findOne({ _id: userId });
    
    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      return NextResponse.json({
        message: "Invalid Password",
        invalidPassword: true,
      });
    }

    if (newPassword !== reEnterPassword) {
      return NextResponse.json(
        { message: "Password not match", invalidMatchPassword: true },
      );
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await Users.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Update Successful", user: result },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during update:", error);
    return NextResponse.json({ message: "Update Failed" }, { status: 500 });
  }
};
