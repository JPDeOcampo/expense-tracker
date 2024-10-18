import { NextResponse } from "next/server";
import { validateToken } from "@/middleware";

export const GET = async (req: Request) => {
  try {
    const validationResponse = await validateToken(req);

    if (validationResponse.error) {
      return NextResponse.json(validationResponse.error);
    }

    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 401 });
  }
};
