import {
    NextRequest,
    NextResponse
} from "next/server";
import {
    PostRequest,
    PostResponse,
} from "@/shared/api/contact";
import { server_config } from "@/utils/server/config";

export async function POST(request: NextRequest) {
    try {
        const json: PostRequest = await request.json();

        if (!json.token || !json.name || !json.email || !json.message) {
            return NextResponse.json<PostResponse>({
                success: false,
                message: "Missing fields",
            }, {
                status: 400,
            });
        }

        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${server_config.env.RECAPTCHA_KEY_SECRET}&response=${json.token}`,
        });

        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return NextResponse.json<PostResponse>({
                success: false,
                message: "reCAPTCHA verification failed",
            }, {
                status: 403,
            });
        }

        const discordRes = await fetch(server_config.env.DISCORD_WEBHOOK_CONTACT, {
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
                                value: json.name
                            },
                            {
                                name: "E-mail",
                                value: json.email
                            },
                            {
                                name: "Mesaj",
                                value: json.message
                            }
                        ]
                    }
                ],
            }),
        });

        if (!discordRes.ok) {
            return NextResponse.json<PostResponse>({
                success: false,
                message: "Failed to send message",
            },
            {
                status: 500,
            });
        }

        return NextResponse.json<PostResponse>({
            success: true,
        });
    } catch (error) {
        return NextResponse.json<PostResponse>({
            success: false,
            message: "Internal Server Error",
        }, {
            status: 500,
        });
    }
}
