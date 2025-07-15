import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { createClientDB } from "@/utils/server/db";
import { UsersRecord } from "@/types/db/users";

interface GetProps {
    pb?: PocketBase;
    redirect?: boolean;
    cookies?: ReadonlyRequestCookies | RequestCookies;
}

export async function get(props: GetProps = { redirect: true }) {
    props.cookies ||= await cookies();
    const session_token = props.cookies.get("session_token")?.value;

    if (!session_token) {
        if (!props.redirect) return null;

        redirect("/login");
    }

    props.pb ||= await createClientDB();
    props.pb.authStore.save(session_token, null);

    try {
        const authData = await props.pb.collection("users").authRefresh();

        return authData.record as UsersRecord;
    } catch {
        if (!props.redirect) return null;

        redirect("/login");
    }
}
