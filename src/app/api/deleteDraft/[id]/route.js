import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";

export const DELETE = async (request, route) => {
  try {
    await connectToDB();
    const { id } = route.params;
    const getForm = await form.findByIdAndDelete(id);
    if (!getForm) {
      return NextResponse.json(
        {
          success: false,
          message: "Form not found!",
        },
        { status: 203 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Form delete successfully.",
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
