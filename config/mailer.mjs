import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  connectionTimeout: 5000, // Таймаут подключения (5 секунд)
  socketTimeout: 10000,   // Таймаут отправки письма (10 секунд)
});

export default async function sendMailer(data) {
  try {
    console.log(`Sending email to: ${data.user}`);
    const message = await transporter.sendMail({
      from: process.env.EMAIL,
      to: data.user,
      subject: data.subject,
      text:'Привет'
    });
    return { success: true, message };
  } catch (error) {
    return { success: false, error: error.message };
  }
}