import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { customerNumber } = reqBody;
    let filter = {};
    if (customerNumber) {
    //   filter["customer.customerNumber"] = { $regex: new RegExp(customerNumber, "i") };
      filter["customer.customerNumber"] = customerNumber;
    }
    const getCustomer = await form.find(filter, {
      "customer.contactPerson": 1,
      "customer.customerNumber": 1,
    });
    const uniqueNamesEmails = {};
    const customers = [];
   getCustomer.forEach((entry) => {
        const { customer } = entry;
        const { customerNumber, contactPerson } = customer;
        const key = `${customerNumber}-${contactPerson}`;
        if (!uniqueNamesEmails[key] && contactPerson) {
            uniqueNamesEmails[key] = true;
            customers.push(customer);
        }
    });
    return NextResponse.json(
      {
        data: customers,
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
