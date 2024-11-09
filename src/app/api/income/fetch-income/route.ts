import connectMongoDB from "../../../../../libs/mongodb";
import Income from "../../../../../models/income";
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
