import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import admin from "@/models/admin";

export const GET = async (request) => {
  try {
    await connectToDB();
    const getUser = await admin.find().sort({ _id: -1 });
    return NextResponse.json({
      data: getUser,
      success: true,
      message: "User Get successfully.",
    });
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

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { pageNo, perPage } = reqBody;
    pageNo = pageNo ? pageNo : 1;
    perPage = perPage ? perPage : 10;
    const getUser = await admin
      .find()
      .skip(perPage * pageNo - perPage)
      .limit(perPage)
      .sort({ _id: -1 });
    const totalRecords = await admin.countDocuments();
    return NextResponse.json({
      currentPageNo: pageNo,
      totalRecords,
      totalPages: Math.ceil(totalRecords / perPage),
      data: getUser,
      success: true,
      message: "User Get successfully.",
    });
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
