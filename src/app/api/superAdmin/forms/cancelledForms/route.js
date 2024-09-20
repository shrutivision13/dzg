import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";
import admin from "@/models/admin";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { pageNo, perPage, search } = reqBody;
    let filter = { isCancelled: true };
    pageNo = pageNo ? pageNo : 1;
    perPage = perPage ? perPage : 10;
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    let getAdmin = await admin.findOne({
      _id: authData ? authData.adminId : null,
    });
    if (search) {
      filter.$or = [
        { "customer.createdBy": { $regex: new RegExp(search, "i") } },
        { "customer.salesArea": { $regex: new RegExp(search, "i") } },
        { "customer.customerName": { $regex: new RegExp(search, "i") } },
        { "configuration.type": { $regex: new RegExp(search, "i") } },
        { "message": { $regex: new RegExp(search, "i") } },
      ];
    }
    if (getAdmin.role == "User") {
      const salesArea = getAdmin.salesArea;
      const writerId = getAdmin ? getAdmin.id : null;
      const getSalesAreaWiseForms = await form
        .find({
          ...filter,
          "customer.salesArea": salesArea,
          writerId: { $ne: writerId },
        })
        .sort({ _id: -1 });
      const getForms = await form
        .find({ ...filter, writerId })
        .sort({ _id: -1 });
      const finalData = [...getForms, ...getSalesAreaWiseForms];
      const totalRecords = finalData.length;
      let paginatedResult = getPaginatedData(finalData, pageNo, perPage);
      return NextResponse.json(
        {
          currentPageNo: pageNo,
          totalRecords,
          totalPages: Math.ceil(totalRecords / perPage),
          data: paginatedResult,
          success: true,
          message: "Form Get successfully.",
        },
        { status: 200 }
      );
    }
    const getForms = await form
      .find(filter)
      .skip(perPage * pageNo - perPage)
      .limit(perPage)
      .sort({ _id: -1 });
    const totalRecords = await form.countDocuments(filter);
    return NextResponse.json(
      {
        currentPageNo: pageNo,
        totalRecords,
        totalPages: Math.ceil(totalRecords / perPage),
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

function getPaginatedData(data, pageNo, perPage) {
  const startIndex = (pageNo - 1) * perPage;
  const endIndex = pageNo * perPage;
  const paginatedData = data.slice(startIndex, endIndex);
  return paginatedData;
}
