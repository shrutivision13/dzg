import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";
import { form_write_logs } from "@/winston/form/logger";
import { releaseFromValidate } from "@/validation/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { formId, isRelease } = reqBody;
    const { error } = releaseFromValidate(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 203 }
      );
    }
    const updateForm = await form.findByIdAndUpdate(
      { _id: formId },
      { isRelease },
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
        message: "Form release successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    form_write_logs({
      message: `Main catch error: ${JSON.stringify(error)} message:${
        error.message
      }`,
      log_type: "error",
    });
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
