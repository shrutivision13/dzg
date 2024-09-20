import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import admin from "@/models/admin";

export const DELETE = async (request, route) => {
  try {
    await connectToDB();
    const { id } = route.params;
    const deletedUser = await admin.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        {
          message: "User not found!",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    return NextResponse.json(
      {
        message: "User deleted successfully.",
        success: true,
      },
      {
        status: 200,
      }
    );
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
};
