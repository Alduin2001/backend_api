import { createTransport } from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();
const transport = createTransport({
  host:'smtp.mail.ru',
  port:465,
  secure:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default async function sendMailer(data) {
  try {
    const message = await transport.sendMail({
      from: process.env.EMAIL,
      to: data.user,
      subject: data.subject,
      html: '<a href="https://almetpt.ru/2020/site">Подтвердить почту</a>',
    });
    return { success: true, message };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
