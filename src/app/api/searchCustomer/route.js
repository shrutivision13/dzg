import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { search } = reqBody;
    let filter = {};
    if (search) {
      filter["customer.customerNumber"] = { $regex: new RegExp(search, "i") };
    }
    const getCustomer = await form.find(filter, {
      "customer.contactPerson": 1,
      "customer.email": 1,
      "customer.customerNumber": 1,
      "customer.customerName": 1,
    });
    const uniqueNamesEmails = {};
    const uniqueData = getCustomer.filter((entry) => {
      const { customer } = entry;
      const { customerNumber, email ,customerName} = customer;
      const key = `${customerNumber}-${customerName}`;
      if (!uniqueNamesEmails[key]) {
        uniqueNamesEmails[key] = true;
        return true;
      }
      return false;
    });
    return NextResponse.json(
      {
        data: uniqueData,
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
