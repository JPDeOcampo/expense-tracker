import connectMongoDB from "../../../../../libs/mongodb";
import Expense from "../../../../../models/expense";
import { NextResponse, NextRequest } from "next/server";
import { validateToken } from "@/middleware";

export const POST = async (request: NextRequest) => {
  const { userId } = await request.json();
  try {
    const validationResponse = await validateToken(request);

    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    await connectMongoDB();

    const expense = await Expense.find({ userId });

    return NextResponse.json({ expense }, { status: 200 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Registration Failed" },
      { status: 500 }
    );
  }
};
