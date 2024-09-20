import { connectToDB } from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import { archivedFormValidate } from "@/validation/form";
import form from "@/models/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = archivedFormValidate(reqBody);
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
    let { formId, isArchived } = reqBody;
    const updateForm = await form.findByIdAndUpdate(
      { _id: formId },
      { isArchived },
      { new: true }
    );
    if (!updateForm) {
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
        message: "Form successfully archived.",
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
