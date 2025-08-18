import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { createClientDB } from "@/utils/server/db";
import { RecordModel } from "pocketbase";

export interface UsersRecord extends RecordModel {
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    name: string;
    avatar: string;
    created: string; // Date
    updated: string; // Date
}

interface GetProps {
    pb?: PocketBase;
    cookies?: ReadonlyRequestCookies | RequestCookies;
}

export async function get(props: GetProps = {}) {
    props.cookies ||= await cookies();
    
    const session_token = props.cookies.get("session_token")?.value;
    if (!session_token) {
        return null;
    }

    props.pb ||= await createClientDB();
    props.pb.authStore.save(session_token, null);

    try {
        const authData = await props.pb.collection("users").authRefresh();

        return authData.record as UsersRecord;
    } catch {}

    return null;
}
