import { NextRequest } from "next/server";
import { auth } from ".";
import { Single } from "@type/utils";
import { headers as nextHeaders } from "next/headers";

type PermissionProps = Single<{
    request: NextRequest;
    headers: Headers;
    next: boolean;
}>;

export async function isAdmin(props: PermissionProps) {
    const headers = props.next ? await nextHeaders()
        : props.headers ? props.headers
            : props.request ? props.request.headers
                : undefined;

    if (!headers) {
        return false;
    }

    const session = await auth.api.getSession({
        headers,
    });

    if (!session) {
        return false;
    }

    return session.user.role === "admin";
}
