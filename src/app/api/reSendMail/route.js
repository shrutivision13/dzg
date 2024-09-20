import { sendEmail } from "@/config/mail";
import form from "@/models/form";
import { connectToDB } from "@/utils/dbConnection";
import { reSendMailValidate } from "@/validation/form";
import { form_write_logs } from "@/winston/form/logger";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = reSendMailValidate(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 203 }
      );
    }
    const { formId, email } = reqBody;
    const getFormData = await form.findById(formId);
    if (!getFormData) {
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
    let clientEmail = getFormData.customer.email;
    if (email) {
      clientEmail = email;
      getFormData.email = clientEmail;
      getFormData.resetToken = uuidv4();
      await getFormData.save();
    }

    let emailResponse = await sendEmail(
      clientEmail,
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
                              <h2>Erstellt von ${getFormData?.customer?.createdBy} hat eine Sollmerkmalsliste (SML) für Sie erstellt. Bitte auf den Link klicken um in einer separaten Mail einen Bestätigungs-Code anzufordern
 und anschließend die SML zu prüfen.</h2>
                              <h3>
                              ${process.env.NEXT_PUBLIC_API_URL}/viewer/${formId}
                              </h3>
                              <p>Ihre Bestellnummer: Bestellnummer des Kunden ${getFormData?.customer?.customerOrderNumber}</p>
                              <p>Wenn Sie von DZG keine SML angefordert haben, denn ignorieren Sie die Mail bitte.</b></p>
                              <br>
                              <p>Mit freundlichen Grüßen</p>
                              <p>DZG Metering GmbH <br/> Heidelberger Str. 32 <br/>16515 Oranienburg</p>
                              <p>Tel: 03301/854-0 <br/> Mail: vertrieb@dzg.de <br/>www.dzg.de</p>
                              </td>
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
        success: true,
        message: `Mail send successfully to this email ${clientEmail}.`,
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
