import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    html: html,
  };
  return await transporter.sendMail(mailOptions);
};
