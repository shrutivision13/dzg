import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import {
  createFormValidate200,
  createFormValidate201,
  createFormValidate202,
  createFormValidate203,
  createFormValidate204,
  createFormValidate205,
  createFormValidate206,
  createFormValidate207,
  createFormValidate208,
  createFormValidate209,
  createFormValidate210,
  createFormValidate211,
  createFormValidate212,
  createFormValidate214,
  createFormValidate215,
  createFormValidate216,
  createFormValidate217,
  createFormValidate218,
  createFormValidate219,
  createFormValidate220,
  createFormValidate222,
  createFormValidate223,
  createFormValidate230,
} from "@/validation/form";
import form from "@/models/form";
import { sendEmail } from "@/config/mail";
import admin from "@/models/admin";
import formName from "@/models/formName";
import jwt from "jsonwebtoken";
import { form_write_logs } from "@/winston/form/logger";
import { v4 as uuidv4 } from "uuid";
import customerSpecification from "@/models/customerSpecification";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const getFormName = await formName.findById(reqBody.formNameId);
    if (!getFormName) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form name id.",
        },
        { status: 203 }
      );
    }
    if (reqBody.isDraft) {
      const newForm = new form(reqBody);
      const token = request.cookies.get("token")?.value || "";
      const authData = jwt.verify(token, process.env.TOKEN_SECRET);
      let getAdmin = await admin.findOne({
        _id: authData ? authData.adminId : null,
      });
      const writerId = getAdmin ? getAdmin.id : null;
      newForm.writerId = writerId;
      const savedForm = await newForm.save();
      return NextResponse.json(
        {
          data: savedForm,
          success: true,
          message: "Form created successfully.",
        },
        { status: 200 }
      );
    }
    let formValidation;
    if (getFormName && getFormName.formName == "WH4209") {
      formValidation = createFormValidate200(reqBody);
    } else if (getFormName && getFormName.formName == "WH4013") {
      formValidation = createFormValidate201(reqBody);
    } else if (getFormName && getFormName.formName == "DVSB") {
      formValidation = createFormValidate202(reqBody);
    } else if (getFormName && getFormName.formName == "DVH4013") {
      formValidation = createFormValidate203(reqBody);
    } else if (getFormName && getFormName.formName == "MDVH4006") {
      formValidation = createFormValidate204(reqBody);
    } else if (getFormName && getFormName.formName == "DVS74") {
      formValidation = createFormValidate205(reqBody);
    } else if (getFormName && getFormName.formName == "WS74") {
      formValidation = createFormValidate206(reqBody);
    } else if (getFormName && getFormName.formName == "DVSBR") {
      formValidation = createFormValidate207(reqBody);
    } else if (getFormName && getFormName.formName == "DVZE") {
      formValidation = createFormValidate208(reqBody);
    } else if (getFormName && getFormName.formName == "DVS76") {
      formValidation = createFormValidate209(reqBody);
    } else if (getFormName && getFormName.formName == "LWMOD-R4") {
      formValidation = createFormValidate210(reqBody);
    } else if (getFormName && getFormName.formName == "GSH01") {
      formValidation = createFormValidate211(reqBody);
    } else if (getFormName && getFormName.formName == "LADMOD-R4") {
      formValidation = createFormValidate212(reqBody);
    } else if (getFormName && getFormName.formName == "Mobile Zähler") {
      formValidation = createFormValidate214(reqBody);
    } else if (getFormName && getFormName.formName == "wMBusMOD-R4") {
      formValidation = createFormValidate215(reqBody);
    } else if (getFormName && getFormName.formName == "wMBus-PlugIn") {
      formValidation = createFormValidate216(reqBody);
    } else if (getFormName && getFormName.formName == "LW-PlugIn") {
      formValidation = createFormValidate217(reqBody);
    } else if (getFormName && getFormName.formName == "ETHMOD-R4") {
      formValidation = createFormValidate218(reqBody);
    } else if (getFormName && getFormName.formName == "WS76") {
      formValidation = createFormValidate219(reqBody);
    } else if (getFormName && getFormName.formName == "DWH4113") {
      formValidation = createFormValidate220(reqBody);
    } else if (getFormName && getFormName.formName == "LMN-PlugIn") {
      formValidation = createFormValidate222(reqBody);
    } else if (getFormName && getFormName.formName == "wMBus.M7-PlugIn") {
      formValidation = createFormValidate223(reqBody);
    } else if (getFormName && getFormName.formName == "EEM-PM157-SLP") {
      formValidation = createFormValidate230(reqBody);
    }
    const { error } = formValidation;
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 203 }
      );
    }
    const newForm = new form(reqBody);
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    let getAdmin = await admin.findOne({
      _id: authData ? authData.adminId : null,
    });
    const writerId = getAdmin ? getAdmin.id : null;
    newForm.writerId = writerId;
    newForm.resetToken = uuidv4();
    const customerName = reqBody.customer.customerName;
    let formId;
    let savedForm;
    if (reqBody._id) {
      reqBody.resetToken = uuidv4();
      savedForm = await form.findByIdAndUpdate(reqBody._id, reqBody, {
        new: true,
      });
      formId = reqBody._id;
    } else {
      savedForm = await newForm.save();
      formId = savedForm.id;
    }
    const getCustomer = await customerSpecification.findOne({
      customerNumber: reqBody.customer.customerNumber,
    });
    if (getCustomer && reqBody.isDefault) {
      const updatedForm = await customerSpecification.findByIdAndUpdate(
        getCustomer.id,
        reqBody,
        {
          new: true,
        }
      );
      if (!updatedForm) {
        return NextResponse.json(
          {
            message: "Form not found!",
            success: false,
          },
          {
            status: 203,
          }
        );
      }
    } else if (getCustomer == null) {
      const newSpecificationData = new customerSpecification(reqBody);
      newSpecificationData.isDefault = reqBody.isDefault;
      newSpecificationData.customerNumber = reqBody.customer.customerNumber;
      await newSpecificationData.save();
    }
    let emailResponse = await sendEmail(
      reqBody.customer.email,
      "DZG Sollmerkmalsliste.",
      `<table width="100%" border="0" align="center" cellpadding="7" cellspacing="0" bgcolor="#e5e5e5"
        style="font-family:Arial;   font-size: 13px; margin:0px auto;">
        <tr>
            <td style="padding:20px">
                <table align="center" border="0" cellpadding="15" cellspacing="0" width="600px">
                    <tbody>
                        <tr style="background:rgb(142, 151, 171);;">
                            <td valign="top" width="50%"
                                style="border-bottom:1px solid #eee;font-size:20px;color:#fff; font-weight:bold; text-align: center; ">
                                <h2>DZG</h2>
                            </td>
                        </tr>
                        <tr bgcolor="#ffffff">
                            <td style="font-family:arial; font-size:15px; border:1px solid #ffffff; color:#333;">
                                <h3>Sehr geehrter Kunde,</h3>
                                <h2>Erstellt von ${savedForm?.customer?.createdBy} hat eine Sollmerkmalsliste (SML) für Sie erstellt. Bitte auf den Link klicken um in einer separaten Mail einen Bestätigungs-Code anzufordern
 und anschließend die SML zu prüfen.</h2>
                                <h3>
                                ${process.env.NEXT_PUBLIC_API_URL}/viewer/${formId}
                                </h3>
                              <p>Ihre Bestellnummer: Bestellnummer des Kunden ${savedForm?.customer?.customerOrderNumber}</p>
                              <p>Wenn Sie von DZG keine SML angefordert haben, denn ignorieren Sie die Mail bitte.</b></p>
                              <br>
                              <p>Mit freundlichen Grüßen</p>
                              <p>DZG Metering GmbH <br/> Heidelberger Str. 32 <br/>16515 Oranienburg</p>
                              <p>Tel: 03301/854-0 <br/> Mail: vertrieb@dzg.de <br/>www.dzg.de</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 16px;" valign="top" align="center" bgcolor="#8e7979ab">
                                <table cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td style="font-family: 'Arial', sans-serif; font-size: 13px; ; line-height: 20px; font-weight: normal; color: #ffffff;"
                                                valign="top" align="left">
                                                © ${new Date().getFullYear()} Powered by DZG Team
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>`
    );
    if (!emailResponse) {
      form_write_logs({
        message: `Error in sending mail.`,
        log_type: "error",
      });
      return NextResponse.json(
        {
          message: "Error in sending mail.",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    return NextResponse.json(
      {
        data: savedForm,
        success: true,
        message: "Form created successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    form_write_logs({
      message: `Main catch error: ${JSON.stringify(error)} message:${error.message
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
