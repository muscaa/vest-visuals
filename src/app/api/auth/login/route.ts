import {
    NextRequest,
    NextResponse
} from "next/server";
import {
    PostRequest,
    PostResponse,
} from "@/types/api/auth/login";
import { server_config } from "@/utils/server/config";
import { createClientDB } from "@/utils/server/db";

export async function POST(request: NextRequest) {
    try {
        const json: PostRequest = await request.json();

        if (!json.token || !json.email || !json.password) {
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

        const pb = await createClientDB();

        try {
            const authData = await pb.collection("users").authWithPassword(json.email, json.password);

            const res = NextResponse.json<PostResponse>({
                success: true,
            });
            res.cookies.set("session_token", authData.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });

            return res;
        } catch (error) {
            return NextResponse.json<PostResponse>({
                success: false,
                message: "Invalid email or password",
            }, {
                status: 401,
            });
        }
    } catch (error) {
        return NextResponse.json<PostResponse>({
            success: false,
            message: "Internal Server Error",
        }, {
            status: 500,
        });
    }
}
