import { NextRequest } from "next/server";

export function getUrl(request: NextRequest, path?: string) {
    const xRealUrl = request.headers.get("x-real-url");
    const base = xRealUrl ?? request.url;
    const url = new URL(path ?? base, base);
    return url;
}

export function getUrlString(request: NextRequest, path?: string) {
    const url = getUrl(request, path);
    return url.toString();
}
