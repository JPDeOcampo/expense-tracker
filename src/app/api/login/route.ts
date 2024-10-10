import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../../../models/users";

const SECRET_KEY = process.env.JWT_SECRET || "your-secure-default-secret";

if (SECRET_KEY === "your-secure-default-secret") {
  console.warn(
    "Warning: Using default secret key. Please set the JWT_SECRET environment variable!"
  );
}

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    await connectMongoDB();

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ token }, { status: 200 });
    response.cookies.set("authToken", token, { httpOnly: true, path: "/" }); // Optional: set a cookie

    return NextResponse.redirect("/pages/dashboard");

  } catch (error) {
    console.log(error);
  }
};

// Optionally handle GET requests if needed
// export const GET = async (request: Request) => {
//   return NextResponse.json({ message: 'GET method not supported for login' }, { status: 405 });
// };
