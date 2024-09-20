import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { formId, otpCode } = reqBody;
    const getForm = await form.findById(formId);
    if (!getForm) {
      return NextResponse.json(
        {
          message: "Form not found.",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    if (otpCode == getForm.otpCode) {
      let checkOTPExpire = Date.now() > getForm.otpExpireIn;
      if (checkOTPExpire) {
        return NextResponse.json(
          {
            message: "OTP expired.",
            success: false,
          },
          {
            status: 203,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: "OTP verify successfully.",
            success: true,
          },
          {
            status: 200,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Invalid OTP!",
          success: false,
        },
        {
          status: 203,
        }
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
