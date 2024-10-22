import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Users from "../../../../../models/users";
import bcrypt from "bcrypt";
import { validateToken } from "@/middleware";
import Expense from "../../../../../models/expense";
import Income from "../../../../../models/income";

export const DELETE = async (request: NextRequest) => {
  try {
    const { password, reEnterPassword } = await request.json(); 

    if (!password || !reEnterPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const validationResponse = await validateToken(request);

    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error, { status: 401 });
    }

    const { userId } = validationResponse;

    await connectMongoDB();

    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({
        message: "Invalid password",
        invalidPassword: true,
      });
    }

    if (password !== reEnterPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", invalidMatchPassword: true },
      );
    }

    // Delete user's income and expense records
    await Income.deleteMany({ userId });
    await Expense.deleteMany({ userId });

    // Delete the user
    await Users.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "User deletion successful" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during deletion:", error);
    return NextResponse.json({ message: "Deletion failed" }, { status: 500 });
  }
};
