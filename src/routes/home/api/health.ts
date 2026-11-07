import { createFileRoute } from "@tanstack/react-router";
import { sql } from "drizzle-orm";
import { db } from "@server/db";

/**
 * Whether the app is up and reaches its database: 200, or 503 when it doesn't. For the container's health check and
 * Uptime Kuma (http://vest-visuals:3000/api/health inside the server, https://vestvisuals.ro/api/health outside).
 */
export const Route = createFileRoute("/home/api/health")({
    server: {
        handlers: {
            GET: async () => {
                try {
                    await db.execute(sql`select 1`);
                    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
                } catch (error) {
                    console.error("Health check failed:", error);
                    return Response.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
                }
            },
        },
    },
});
