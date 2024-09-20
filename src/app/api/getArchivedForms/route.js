import { connectToDB } from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import form from "@/models/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const collationOptions = { locale: 'en', strength: 2 }
    let { pageNo, perPage, search,fieldName,sortType } = reqBody;
    pageNo = pageNo ? pageNo : 1;
    perPage = perPage ? perPage : 10;
    let filter = { $or: [{ isArchived: true},{isCancelled:true}] };
    if (search) {
      filter.$or = [
        { "customer.createdBy": { $regex: new RegExp(search, "i") } },
        { "customer.salesArea": { $regex: new RegExp(search, "i") } },
        { "customer.customerName": { $regex: new RegExp(search, "i") } },
        { "configuration.type": { $regex: new RegExp(search, "i") } },
      ];
    }
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
            getForm: sortedData,
            success: true,
            message: "Form successfully archived.",
          },
          { status: 200 }
        );
      }
      else {
        sortObject[fieldName] = Number(sortType);
      }
    }
    const getForm = await form
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
        success: true,
        getForm,
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
