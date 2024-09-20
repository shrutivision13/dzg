import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import formName from "@/models/formName";

export const GET = async (request) => {
  try {
    await connectToDB();
    const getForms = await formName.find().sort({ formNo: 1 });
    return NextResponse.json(
      {
        data: getForms,
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
