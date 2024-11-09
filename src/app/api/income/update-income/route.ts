import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Users from "../../../../../models/users";
import Income from "../../../../../models/income";
import { validateToken } from "@/middleware";

export const PUT = async (request: NextRequest) => {
  try {

    const updates = await request.json();

    // Filter out undefined fields and empty strings
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key, value]) => value !== undefined && value !== "")
    );

    const validationResponse = await validateToken(request);

    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    const { userId } = validationResponse;

    if (filteredUpdates.reqUserId !== userId) {
      return NextResponse.json(
        { message: "Invalid token, redirecting to login", invalidToken: true },
      );
    }

    await connectMongoDB();

    const existingUserId = await Users.findOne({ userId: userId });
    const existingIncomeId = await Income.findOne({ _id: filteredUpdates.id });
    
    if (!existingUserId && !existingIncomeId) {
      return NextResponse.json({ message: "Invalid item Id", invalidId: true });
    }

    const result = await Income.findByIdAndUpdate(
      filteredUpdates.id,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    );

    if (!result) {
      return NextResponse.json({ message: "Items not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Updated successfully!", user: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during update:", error);
    return NextResponse.json({ message: "Update Failed" }, { status: 500 });
  }
};
