import { paraglideMiddleware } from "@shared/paraglide/server";
import handler from "@tanstack/react-start/server-entry";

export default {
    fetch(req: Request): Promise<Response> {
        return paraglideMiddleware(req, () => handler.fetch(req));
    },
};
