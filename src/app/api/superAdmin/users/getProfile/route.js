import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import admin from "@/models/admin";
import jwt from "jsonwebtoken";

export const GET = async (request) => {
  try {
    await connectToDB();
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    let getUser = await admin.findOne({
      _id: authData ? authData.adminId : null,
    });
    return NextResponse.json({
      data: getUser,
      success: true,
      message: "User Profile Get successfully.",
    });
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
