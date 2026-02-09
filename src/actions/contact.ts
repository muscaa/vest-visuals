"use server";

import { ActionResponse } from "@type/http";
import { serverConfig } from "@server/config";

interface ReCaptchaData {
    success: boolean;
    score: number;
}

export async function sendContact(token: string, name: string, email: string, message: string): ActionResponse<void> {
    try {
        if (!token || !name || !email || !message) {
            return ["BAD_REQUEST", "Missing fields"];
        }

        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${serverConfig.env.RECAPTCHA_KEY_SECRET}&response=${token}`,
        });

        const recaptchaData: ReCaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return ["FORBIDDEN", "reCAPTCHA verification failed"];
        }

        const discordRes = await fetch(serverConfig.env.DISCORD_WEBHOOK_CONTACT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                embeds: [
                    {
                        color: 2326507,
                        fields: [
                            {
                                name: "Nume",
                                value: name
                            },
                            {
                                name: "E-mail",
                                value: email
                            },
                            {
                                name: "Mesaj",
                                value: message
                            }
                        ]
                    }
                ],
            }),
        });

        if (!discordRes.ok) {
            return ["INTERNAL_SERVER_ERROR", "Failed to send message"];
        }

        return ["OK"];
    } catch (error) {
        return ["INTERNAL_SERVER_ERROR", "Internal Server Error"];
    }
}
