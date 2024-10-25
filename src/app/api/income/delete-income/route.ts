import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Income from "../../../../../models/income";

export const DELETE = async (request: NextRequest) => {
  try {
    const { id } = await request.json(); 
   
    await connectMongoDB();

    await Income.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Income deletion successful" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during deletion:", error);
    return NextResponse.json({ message: "Deletion failed" }, { status: 500 });
  }
};
