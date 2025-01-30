import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

export const sendEmailToTeachers = async (teachers, file) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: teachers.join(","), // Send to all teachers
    subject: "New File Uploaded",
    text: `A new file "${file.description}" has been uploaded. Click here to view: ${process.env.FRONTEND_URL}/files`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};


