import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Users from "../../../../../models/users";
import { validateToken } from "@/middleware";

export const PUT = async (request: NextRequest) => {
  try {
    const updates = await request.json(); // Get all updates from the request

    // Filter out undefined fields and empty strings
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key, value]) => value !== undefined && value !== "")
    );

    const validationResponse = await validateToken(request);

    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    const { userId } = validationResponse;

    await connectMongoDB();

    // Check for email uniqueness if the email is being updated
    if (filteredUpdates.email) {
      const existingUser = await Users.findOne({ email: filteredUpdates.email });
  
      // If the user exists and it's not the current user's email
      if (existingUser && existingUser._id.toString() === userId) {
        return NextResponse.json(
          { message: "Email already exists", invalidEmail: true}
        );
      }
    }

    const result = await Users.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates }, // Use $set to only update provided fields
      { new: true, runValidators: true } // runValidators to enforce schema validation
    );

    if (!result) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Update Successful", user: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during update:", error);
    return NextResponse.json({ message: "Update Failed" }, { status: 500 });
  }
};
