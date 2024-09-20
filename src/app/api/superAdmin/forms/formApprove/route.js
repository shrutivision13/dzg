import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";
import admin from "@/models/admin";
import puppeteer from "puppeteer";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import formName from "@/models/formName";
import { form_write_logs } from "@/winston/form/logger";
import { writerFromApproveValidate } from "@/validation/form";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const {
      formId,
      approvedBy,
      isWriterApproved,
      date,
      formNameId,
      // apOrderNumber,
      isApproved,
      requestForChanges,
    } = reqBody;
    const { error } = writerFromApproveValidate(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 203 }
      );
    }
    const getForm = await form
      .findById(formId)
      .populate("writerId", "name", admin);
    const getFormName = await formName.findById(formNameId);
    if (!getFormName) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form name id.",
        },
        { status: 203 }
      );
    }
    if (isApproved) {
      getForm.path = `/template/${formId}-form.pdf`;
      getForm.isWriterApproved = isWriterApproved;
      getForm.isApproved = isApproved;
      // getForm.apOrderNumber = apOrderNumber;
      getForm.requestForChanges = requestForChanges;
      getForm.resetToken = null;
      getForm.releases.approvalBySales.push({
        name: getForm?.writerId?.name,
        date,
        approvalFromCustomerViaEmailOrPhone: approvedBy,
      });
      await getForm.save();
      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      const ejsTemplate = fs.readFileSync(
        path.join(process.cwd(), `./src/views/${getFormName.formName}.ejs`),
        "utf8"
      );
      const compiledTemplate = ejs.render(ejsTemplate, {
        updatedForm: getForm,
        image: `${process.env.NEXT_PUBLIC_API_URL}/file.jpg`,
        writerSign: getForm?.writerId?.name,
        reviewerSign: getForm?.customer?.customerName,
      });
      await page.setContent(compiledTemplate);
      await page.pdf({
        path: `./public/template/${formId}-form.pdf`,
        format: "A4",
        margin: {
          top: '0.5in', // Space at the top of the page
          right: '0.3in', // Space at the right of the page
          bottom: '0.5in', // Space at the bottom of the page
          left: '0.3in', // Space at the left of the page
        },
      });
      await browser.close();
      form_write_logs({
        message: `PDF generated successfully.`,
        log_type: "info",
      });
    }
    return NextResponse.json(
      {
        success: true,
        message: "Form approved successfully.",
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
