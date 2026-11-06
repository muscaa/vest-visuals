/**
 * Keeps the workflow engine's routes (/.well-known/workflow/…) to its own worker: they have no authentication, and the
 * worker calls them from this same process, over loopback. Any other caller gets a 404, whatever its headers say;
 * the path is normalised first, so encoded or doubled variants can't slip past. Nitro middleware, run on every
 * request, as the engine's routes are handled before the app's own server entry. Production only: the dev server
 * doesn't expose the connection, and isn't reachable from outside.
 */
import { defineHandler } from "nitro/h3";

const loopback = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

function isWorkflowPath(pathname: string) {
    let path = pathname;
    try {
        path = decodeURIComponent(pathname);
    } catch {
        // malformed escapes: match on it as it is
    }
    return path.replace(/\/{2,}/g, "/").toLowerCase().startsWith("/.well-known/workflow");
}

export default defineHandler((event) => {
    if (import.meta.dev || !isWorkflowPath(event.url.pathname)) return;

    // the socket's own address, not the `ip` that X-Forwarded-For could set
    const runtime = (event.req as { runtime?: { node?: { req?: { socket?: { remoteAddress?: string } } } } }).runtime;
    const address = runtime?.node?.req?.socket?.remoteAddress;
    if (!address || !loopback.has(address)) {
        return new Response(null, { status: 404 });
    }
});
