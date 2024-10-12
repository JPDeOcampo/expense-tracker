import { NextResponse } from "next/server";
import { validateToken } from "../../../../libs/validateToken";

export const GET = async (req: Request) => {
  try {
    const validationResponse = await validateToken(req);
    console.log(validationResponse);
    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error, { status: validationResponse.error.status });
    }

    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};