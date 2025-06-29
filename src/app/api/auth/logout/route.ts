import {
    NextRequest,
    NextResponse
} from "next/server";

export async function GET(request: NextRequest) {
    console.log("logout -------------");
    console.log(request.url);

    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("session_token");

    request.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    console.log("--------------------");
    return res;
}
