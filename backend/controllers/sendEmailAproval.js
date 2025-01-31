import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export  async function sendApprovalEmail(email) {
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
    subject: "Your Account Has Been Approved",
    text: "Congratulations! Your teacher account has been approved. You can now log in.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log("Email sent: " + info.response);
  });
}

