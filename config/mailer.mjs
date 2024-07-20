import { createTransport } from "nodemailer";

const transport = createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

export default async function sendMailer(data){
    const message = await transport.sendMail({
        from:process.env.EMAIL,
        to:data.user,
        subject:data.subject,
        text:data.body
    });
}

