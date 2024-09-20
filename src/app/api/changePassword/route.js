import admin from "@/models/admin";
import { connectToDB } from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { changePasswordValidate } from "@/validation/user";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = changePasswordValidate(reqBody);
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
    let { currentPassword, newPassword } = reqBody;
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    let getAdmin = await admin.findOne({
      _id: authData ? authData.adminId : null,
    });
    const findUser = await admin.findOne({ email: getAdmin.email });
    if (!findUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 203 }
      );
    }
    if (currentPassword == newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Old password and newpassword must be not same.",
        },
        { status: 203 }
      );
    }
    const checkPassword = await bcryptjs.compare(
      currentPassword,
      findUser.password
    );
    if (checkPassword) {
      newPassword = await bcryptjs.hash(newPassword, 10);
      const updatePassword = await admin.findByIdAndUpdate(
        { _id: findUser._id },
        { password: newPassword },
        { new: true }
      );
      if (!updatePassword) {
        return NextResponse.json(
          {
            error: error.message,
            success: false,
            message: "Something went wrong, please try agian!",
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: "Your password successfully changed.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Your old password is wrong!",
        },
        { status: 203 }
      );
    }
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
