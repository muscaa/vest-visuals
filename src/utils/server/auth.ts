import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PocketBase from "pocketbase";
import { RecordModel } from "pocketbase";
import { server_config } from "@/utils/server/config";
import { headers } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function createClient() {
    const headersList = await headers();

    const pb = new PocketBase(server_config.env.POCKETBASE_URL);
    pb.beforeSend = (url, options) => {
        options.headers = {
            ...options.headers,
            "X-Forwarded-For": headersList.get("x-forwarded-for") || "",
        };

        return { url, options };
    }

    return pb;
}

export interface User extends RecordModel {
    avatar: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    name: string;
    updated: string;
    verified: boolean;
}

export async function getUser(redirectToLogin = true, cookieStore?: ReadonlyRequestCookies | RequestCookies, pb?: PocketBase) {
    cookieStore ||= await cookies();
    const session_token = cookieStore.get("session_token")?.value;

    if (!session_token) {
        if (!redirectToLogin) return null;

        redirect("/login");
    }

    pb ||= await createClient();
    pb.authStore.save(session_token, null);

    try {
        const authData = await pb.collection("users").authRefresh();

        return authData.record as User;
    } catch {
        if (!redirectToLogin) return null;

        redirect("/login");
    }
}
