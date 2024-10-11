import connectMongoDB from "../../../../../../libs/mongodb";
import Users from "../../../../../../models/users";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    await connectMongoDB();

    // Find the login entry by ID
    const login = await Users.findOne({ _id: id });

    // Check if the entry was found
    if (!login) {
      return NextResponse.json(
        { message: "Login entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ login }, { status: 200 });
  } catch (error) {
    console.error("Error during retrieval:", error);
    return NextResponse.json({ message: "Retrieval Failed" }, { status: 500 });
  }
};
