import connectMongoDB from "../../../../../libs/mongodb";
import Income from "../../../../../models/income";
import { NextResponse } from "next/server";
import { validateToken } from "@/middleware";

export const GET = async (request: Request) => {
  try {
    const validationResponse = await validateToken(request);
    
    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    const { userId } = validationResponse;

    await connectMongoDB();

    const income = await Income.find({ userId });

    return NextResponse.json({ income }, { status: 200 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Registration Failed" },
      { status: 500 }
    );
  }
};
