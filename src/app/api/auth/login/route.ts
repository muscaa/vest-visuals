import {
    NextRequest,
    NextResponse
} from "next/server";
import {
    PostRequest,
    PostResponse,
} from "@/shared/api/auth/login";
import * as config from "@/config/server";
import { createClient } from "@/utils/server/auth";

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
            body: `secret=${config.env.RECAPTCHA_KEY_SECRET}&response=${json.token}`,
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

        const pb = await createClient();

        try {
            const authData = await pb.collection("users").authWithPassword(json.email, json.password);

            const res = NextResponse.json<PostResponse>({
                success: true,
            });
            res.cookies.set("session_token", authData.token, {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
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
