import { connectToDB } from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDB();
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successfully.",
      },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
        message: "Something went wrong, please try agian!",
      },
      { status: 500 }
    );
  }
}
