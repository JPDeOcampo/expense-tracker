import connectMongoDB from "../../../../../libs/mongodb";
import Income from "../../../../../models/income";
import { NextResponse, NextRequest } from "next/server";
import { validateToken } from "@/middleware";
import Users from "../../../../../models/users";

export const POST = async (request: NextRequest) => {
  try {
    const { reqUserId, date, amount, category, frequency, paymentMethod, note } =
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

    if (reqUserId !== userId) {
      return NextResponse.json(
        { message: "Invalid token, redirecting to login", invalidToken: true },
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
      { message: "New income has been successfully added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during adding new income:", error);
    return NextResponse.json(
      { message: "Adding new income failed" },
      { status: 500 }
    );
  }
};
