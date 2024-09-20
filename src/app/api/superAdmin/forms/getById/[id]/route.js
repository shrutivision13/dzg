import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";
import changedFormData from "@/models/changedFormData";

export const GET = async (request, route) => {
  try {
    await connectToDB();
    const { id } = route.params;
    const getForm = await form.findById(id, {
      updatedAt: 0,
      createdAt: 0,
      __v: 0,
      otpCode: 0,
      otpExpireIn: 0,
      writerId: 0,
      path: 0,
      requestForChanges: 0,
    });
    if (!getForm) {
      return NextResponse.json(
        {
          success: false,
          message: "Form not found!",
        },
        { status: 203 }
      );
    }
    const token = request.cookies.get("token")?.value || "";
    if (token == "" && getForm.resetToken == null) {
      return NextResponse.json(
        {
          success: false,
          isOpen: true,
          message: "Link is  expired.",
        },
        { status: 203 }
      );
    }
    const changedData = await changedFormData
      .findOne({ formId: id })
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        data: getForm,
        changedData,
        success: true,
        message: "Form Get successfully.",
      },
      { status: 200 }
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
