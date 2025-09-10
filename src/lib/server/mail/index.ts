import { createTransport } from "nodemailer";
import { serverConfig } from "../config";

export interface MailTemplate {
    subject: string;
    body: string;
}

const transporter = createTransport({
    host: serverConfig.env.SMTP_HOST,
    port: parseInt(serverConfig.env.SMTP_PORT),
    requireTLS: true,
    auth: {
        type: "login",
        user: serverConfig.env.SMTP_USERNAME,
        pass: serverConfig.env.SMTP_PASSWORD,
    },
});

export async function sendMail(to: string[], content: MailTemplate) {
    return await transporter.sendMail({
        from: `"${serverConfig.env.SMTP_SENDER_NAME}" <${serverConfig.env.SMTP_SENDER_ADDRESS}>`,
        to: to.join(", "),
        subject: content.subject,
        html: content.body,
    });
}
