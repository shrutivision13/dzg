import { connectToDB } from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { loginValidate } from "@/validation/admin";
import jwt from "jsonwebtoken";
import admin from "@/models/admin";

// role: 1=Super Admin
export async function POST(request) {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = loginValidate(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 203,
        }
      );
    }
    const { email, password } = reqBody;
    const getAdmin = await admin.findOne({ email });
    if (!getAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found!",
        },
        { status: 203 }
      );
    }
    const validPassword = await bcryptjs.compare(password, getAdmin.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password.", success: false },
        { status: 203 }
      );
    }
    const token = jwt.sign(
      {
        adminId: getAdmin._id,
        email: getAdmin.email,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const response = NextResponse.json(
      {
        data: getAdmin,
        token,
        success: true,
        message: "Login successfully.",
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
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
