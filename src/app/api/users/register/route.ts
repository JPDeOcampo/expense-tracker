import connectMongoDB from "../../../../../libs/mongodb";
import Users from "../../../../../models/users";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { firstName, lastName, email, username, password } = await request.json();

  
    if (!firstName || !lastName || !email || !username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    
    await newUser.save();

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

