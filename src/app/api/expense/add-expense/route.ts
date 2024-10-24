import connectMongoDB from "../../../../../libs/mongodb";
import Expense from "../../../../../models/expense";
import { NextResponse, NextRequest } from "next/server";
import { validateToken } from "@/middleware";

export const POST = async (request: NextRequest) => {
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
      { message: "New expense has been successfully added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during adding new expense:", error);
    return NextResponse.json(
      { message: "Adding new item expense" },
      { status: 500 }
    );
  }
};
