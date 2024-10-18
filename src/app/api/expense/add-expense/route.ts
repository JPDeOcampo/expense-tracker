import connectMongoDB from "../../../../../libs/mongodb";
import Expense from "../../../../../models/expense";
import { NextResponse } from "next/server";
import { validateToken } from "@/middleware";

export const POST = async (request: Request) => {
  try {
    const { date, amount, category, paymentMethod, note } =
      await request.json();

    if (
      !date ||
      !amount ||
      !category ||
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

    const newExpense = new Expense({
      userId,
      date,
      amount,
      category,
      paymentMethod,
      note,
    });

    await newExpense.save();

    return NextResponse.json(
      { message: "Add expense Success" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Adding new expense Failed" },
      { status: 500 }
    );
  }
};
