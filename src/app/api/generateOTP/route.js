import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConnection";
import form from "@/models/form";
import { sendEmail } from "@/config/mail";
import { form_write_logs } from "@/winston/form/logger";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const getForm = await form.findById(reqBody.formId);
    if (!getForm) {
      return NextResponse.json(
        {
          message: "Form not found.",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    const token = request.cookies.get("token")?.value || "";
    if (token == "" && getForm.resetToken == null) {
      return NextResponse.json(
        {
          success: false,
          isOpen: true,
          message: "Link is expired.",
        },
        { status: 203 }
      );
    }
    let email = getForm.email ? getForm.email : getForm.customer.email;
    let otpCode = Math.floor(100000 + Math.random() * 900000);
    let emailResponse = await sendEmail(
      email,
      "DZG Bestätigungs-Code.",
      `<table width="100%" border="0" align="center" cellpadding="7" cellspacing="0" bgcolor="#e5e5e5"
      style="font-family:Arial;   font-size: 13px; margin:0px auto;">
      <tr>
          <td style="padding:20px">
              <table align="center" border="0" cellpadding="15" cellspacing="0" width="600px">
                  <tbody>
                      <tr style="background:rgb(142, 151, 171);">
                          <td valign="top" width="50%"
                              style="border-bottom:1px solid #eee;font-size:20px;color:#fff; font-weight:bold; text-align: center; ">
                              <h2>DZG</h2>
                          </td>
                      </tr>
                      <tr bgcolor="#ffffff">
                          <td style="font-family:arial; font-size:15px; border:1px solid #ffffff; color:#333;">
                              <h3>Sehr geehrter Kunde,</h3>
                              <p>Bitte verwenden Sie den unten stehenden Bestätigungs-Code um Ihre Sollmerkmalsliste zu prüfen.</p>
                              <h2>
                                  ${otpCode}
                              </h2>
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
    let otpExpireIn = Date.now() + Number(process.env.OTP_VALID_TIME);
    const updatedForm = await form.findByIdAndUpdate(
      reqBody.formId,
      { otpCode: otpCode, otpExpireIn: otpExpireIn },
      {
        new: true,
      }
    );
    if (!updatedForm) {
      return NextResponse.json(
        {
          message: "Error in update form",
          success: false,
        },
        {
          status: 203,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "OTP is sent to your email.",
      },
      {
        status: 200,
      }
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
