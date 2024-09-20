import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import { createNewPasswordValidate } from "@/validation/user";
import bcryptjs from "bcryptjs";
import admin from "@/models/admin";
import { form_write_logs } from "@/winston/form/logger";
import { sendEmail } from "@/config/mail";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = createNewPasswordValidate(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 203,
        }
      );
    }
    const { email } = reqBody;
    const getAdmin = await admin.findOne({ email });
    if (!getAdmin) {
      return NextResponse.json(
        {
          message: "Email not exists.",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    var randomString = Math.random().toString(36).slice(-6);
    const hashedPassword = await bcryptjs.hash(randomString, 10);
    const updatePassword = await admin.findByIdAndUpdate(
      { _id: getAdmin._id },
      { password: hashedPassword },
      { new: true }
    );
    if (!updatePassword) {
      return NextResponse.json(
        {
          error: error.message,
          success: false,
          message: "Something went wrong, please try agian!",
        },
        { status: 500 }
      );
    }
    let emailResponse = await sendEmail(
      email,
      "New Login Password.",
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
                              <h3>Hi ${getAdmin.name},</h3>
                              <p>Please use below password to login your account.</p>
                              <h2>
                                  ${randomString}
                              </h2>
                              <p>If you didn’t request this, you can ignore this email.</b></p>
                              <br>
                              <p>Regards,<br />DZG Team</p>
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
    return NextResponse.json({
      success: true,
      message: `New password send to ${email} email.`,
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
