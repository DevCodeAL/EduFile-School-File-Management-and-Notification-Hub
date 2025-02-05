import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export  async function sendPrincipalsNotificationsEmail(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your Principal Account Has Been Created",
    text: "We are pleased to inform you that your principal account has been successfully created by the admin. You can now log in using your assigned credentials to access the system",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log("Email sent: " + info.response);
  });
}

