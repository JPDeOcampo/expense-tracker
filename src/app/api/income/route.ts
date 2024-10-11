import connectMongoDB from "../../../../libs/mongodb";
import Income from "../../../../models/income";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { userId, date, amount, category, frequency, paymentMethod, note } =
      await request.json();

    if (
      !userId ||
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
