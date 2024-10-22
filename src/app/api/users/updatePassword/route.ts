import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../../../../models/users";
import * as cookie from "cookie";

export const PUT = async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    try {
      const { id } = params;
  
      // Parse the incoming JSON body
      const { newUsername: username, newPassword: password } =
        await request.json();
  
      if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
      }
  
      await connectMongoDB();
  
      const result = await Users.findByIdAndUpdate(
        id,
        { username, password },
        { new: true }
      );
  
      if (!result) {
        return NextResponse.json(
          { message: "Login entry not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Updated Success", result },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during update:", error);
      return NextResponse.json({ message: "Update Failed" }, { status: 500 });
    }
  };