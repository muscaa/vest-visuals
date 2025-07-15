import { NextRequest } from "next/server";

export async function safeJSON<T>(input: NextRequest | string, validate?: (json: T) => any) {
    try {
        let json: T;
        switch (typeof input) {
            case "string":
                json = JSON.parse(input);
                break;
            default:
                json = await input.json();
                break;
        }

        if (validate && !validate(json)) {
            return null;
        }
        
        return json;
    } catch (error) {}
    return null;
}

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
