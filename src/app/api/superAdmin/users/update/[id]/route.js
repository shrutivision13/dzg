import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import { updateUserValidate } from "@/validation/user";
import admin from "@/models/admin";

export const PUT = async (request, route) => {
  try {
    await connectToDB();
    const { id } = route.params;
    const reqBody = await request.json();
    const { error } = updateUserValidate(reqBody);
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
    const { email, name, salesArea, role } = reqBody;
    const getUserById = await admin.findById(id);
    if (!getUserById) {
      return NextResponse.json(
        {
          message: "Invalid user id.",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    const getUser = await admin.findOne({ _id: { $ne: id }, email });
    if (getUser) {
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
    const updatedUser = await admin.findByIdAndUpdate(
      id,
      { email, name, salesArea, role },
      { new: true }
    );
    if (!updatedUser) {
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
        message: "User updated successfully.",
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
