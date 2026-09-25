import { paraglideMiddleware } from "@shared/paraglide/server";
import handler from "@tanstack/react-start/server-entry";

export default {
    fetch(request: Request): Promise<Response> {
        const proto = request.headers.get("x-forwarded-proto");
        if (proto) {
            const url = new URL(request.url);
            url.protocol = `${proto}:`;
            request = new Request(url, request);
        }
        return paraglideMiddleware(request, () => handler.fetch(request));
    },
};
