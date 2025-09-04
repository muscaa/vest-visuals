import { createTransport } from "nodemailer";
import { serverConfig } from "./config";

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

export async function sendMail(to: string[], subject: string, body: string) {
    return await transporter.sendMail({
        from: `"${serverConfig.env.SMTP_SENDER_NAME}" <${serverConfig.env.SMTP_SENDER_ADDRESS}>`,
        to: to.join(", "),
        subject: subject,
        html: body,
    });
}
