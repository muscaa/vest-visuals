import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PocketBase from "pocketbase";
import { RecordModel } from "pocketbase";
import * as config from "@/config/server";

export interface User extends RecordModel {
    avatar: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    name: string;
    updated: string;
    verified: boolean;
}

export async function getUser(redirectToLogin = true) {
    const cookieStore = await cookies();
    const session_token = cookieStore.get("session_token")?.value;

    if (!session_token) {
        if (!redirectToLogin) return null;

        redirect("/login");
    }

    const pb = new PocketBase(config.env.POCKETBASE_URL);
    pb.authStore.save(session_token, null);

    try {
        const authData = await pb.collection("users").authRefresh();
        
        return authData.record as User;
    } catch {
        if (!redirectToLogin) return null;

        redirect("/login");
    }
}
