import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Users from "../../../../models/users";

export const GET = async () => {
    try {
      await connectMongoDB();
      const users = await Users.find(); 
  
      return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { message: "Error fetching user" },
        { status: 500 }
      );
    }
  };