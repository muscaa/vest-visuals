import { NextRequest } from "next/server";
import { auth } from ".";

export async function isAdmin(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    
    if (!session) {
        return false;
    }

    return session.user.role === "admin";
}
