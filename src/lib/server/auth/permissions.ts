import { NextRequest } from "next/server";
import { auth } from ".";
import { Single } from "@type/utils";

type PermissionProps = Single<{
    request: NextRequest;
    headers: Headers;
}>;

export async function isAdmin(props: PermissionProps) {
    const headers = props.headers ?? props.request.headers;

    const session = await auth.api.getSession({
        headers,
    });
    
    if (!session) {
        return false;
    }

    return session.user.role === "admin";
}
