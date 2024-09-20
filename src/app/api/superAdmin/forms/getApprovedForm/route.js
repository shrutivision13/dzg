import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";
import admin from "@/models/admin";
import jwt from "jsonwebtoken";
import { cleanFilterItem } from "@mui/x-data-grid/hooks/features/filter/gridFilterUtils";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { pageNo, perPage, search, statusFilter, fieldName, sortType } = reqBody;
    const collationOptions = { locale: 'en', strength: 2 }
    statusFilter = statusFilter?.isInProgress ? { isApproved: false, isDraft: false, isReviewerApproved: false, requestForChanges: false } : statusFilter?.isApproved ? { ...statusFilter, isRelease: false } : statusFilter
    let filter = { isArchived: false, isCancelled: false, ...statusFilter };
    pageNo = pageNo ? pageNo : 1;
    perPage = perPage ? perPage : 10;
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    let getAdmin = await admin.findOne({
      _id: authData ? authData.adminId : null,
    });
    const totalRecords = await form.countDocuments(filter);
    const sortObject = {};
    if (fieldName && sortType) {
      if (fieldName === "customer.date") {
        const sortedData = await form.aggregate([
          {
            $match: filter
          },
          {
            $addFields: {
              formattedDate: {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      {
                        $substr: ["$customer.date", 6, 4]
                      },
                      "/",
                      {
                        $substr: ["$customer.date", 3, 2]
                      },
                      "/",
                      {
                        $substr: ["$customer.date", 0, 2]
                      }
                    ]
                  },
                  format: "%Y/%m/%d"
                }
              }
            }
          },
          {
            $sort: {
              formattedDate: Number(sortType)
            }
          },
          {
            $skip: perPage * pageNo - perPage 
          },
          {
            $limit: perPage
          }
        ])
        return NextResponse.json(
          {
            currentPageNo: pageNo,
            totalRecords,
            totalPages: Math.ceil(totalRecords / perPage),
            data: sortedData,
            success: true,
            message: "Form Get successfully.",
          },
          { status: 200 }
        );
      }
      else {
        sortObject[fieldName] = Number(sortType);
      }
    }
    if (search) {
      filter.$or = [
        { "customer.createdBy": { $regex: new RegExp(search, "i") } },
        { "customer.salesArea": { $regex: new RegExp(search, "i") } },
        { "customer.customerName": { $regex: new RegExp(search, "i") } },
        { "configuration.type": { $regex: new RegExp(search, "i") } },
      ];
    }
    if (getAdmin.role == "User") {
      const salesArea = getAdmin.salesArea;
      const writerId = getAdmin ? getAdmin.id : null;
      filter.customer.salesArea = salesArea;
      filter.writerId = { $ne: writerId }
    }

    const getForms = await form
      .find(filter)
      .skip(perPage * pageNo - perPage)
      .limit(perPage)
      .sort(sortObject)
      .collation(collationOptions);
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
