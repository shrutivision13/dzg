import { connectToDB } from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { signUpValidate } from "@/validation/admin";
import admin from "@/models/admin";

export async function POST(request) {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = signUpValidate(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: "Something went wrong, please try agian!",
        },
        {
          status: 203,
        }
      );
    }
    const { email, password, name, salesArea } = reqBody;
    const getAdmin = await admin.findOne({ email });
    if (getAdmin) {
      return NextResponse.json(
        {
          message: "Email already exists.",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newAdmin = new admin({
      email,
      password: hashedPassword,
      role: "Admin",
      name,
      salesArea,
    });
    const savedAdmin = await newAdmin.save();
    return NextResponse.json(
      {
        message: "Admin created successfully",
        success: true,
        savedAdmin,
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
}
