import connectMongoDB from "../../../../../libs/mongodb";
import Income from "../../../../../models/income";
import { NextResponse, NextRequest } from "next/server";
import { validateToken } from "@/middleware";

export const POST = async (request: NextRequest) => {
  try {
    const { date, amount, category, frequency, paymentMethod, note } =
      await request.json();

    if (
      !date ||
      !amount ||
      !category ||
      !frequency ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { message: "All fields are required"},
        { status: 400 }
      );
    }

    const validationResponse = await validateToken(request);
    
    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    const { userId } = validationResponse;

    await connectMongoDB();

    const newIncome = new Income({
      userId,
      date,
      amount,
      category,
      frequency,
      paymentMethod,
      note,
    });

    await newIncome.save();

    return NextResponse.json(
      { message: "Registration Success" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Registration Failed" },
      { status: 500 }
    );
  }
};
