import connectMongoDB from "../../../../libs/mongodb";
import Income from "../../../../models/income";
import { NextResponse } from "next/server";
import * as jose from "jose";
import * as cookie from "cookie";

export const POST = async (request: Request) => {
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

       const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
      
       const cookies = request.headers.get("cookie");
       if (!cookies) {
         return NextResponse.json({ message: "No authentication token" }, { status: 401 });
       }
   
       const { token } = cookie.parse(cookies || "");
   
       if (!token) {
         return NextResponse.json({ message: "Token not found" }, { status: 401 });
       }
   
       const { payload } = await jose.jwtVerify(token, SECRET_KEY);
       const userId = payload.id; 
       
       if (!userId) {
         return NextResponse.json({ message: "Invalid token" }, { status: 401 });
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
