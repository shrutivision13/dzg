import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import customerSpecification from "@/models/customerSpecification";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { customerNumber } = reqBody;
    const getCustomerSpecification = await customerSpecification.findOne({
      customerNumber,
    });
    return NextResponse.json(
      {
        data: getCustomerSpecification,
        success: true,
        message: "Data Get successfully.",
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
