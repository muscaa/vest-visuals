/**
 * Starts the workflow engine on Postgres when WORKFLOW_TARGET_WORLD says so (the app stack sets it): runs are kept in
 * the database, so they survive restarts, and its worker picks them up from there. Imported by name here, not by the
 * engine at runtime, so the build bundles it. Without the variable, in development, the engine keeps its runs in
 * .workflow-data/ and there's nothing to start.
 */
import { definePlugin } from "nitro";
import { createWorld } from "@workflow/world-postgres";
import { setWorld } from "workflow/runtime";

export default definePlugin(async () => {
    if (process.env.WORKFLOW_TARGET_WORLD !== "@workflow/world-postgres") return;

    // DATABASE_URL, unless WORKFLOW_POSTGRES_URL points elsewhere; its tables come from server/migrate.ts
    const world = createWorld();
    setWorld(world);
    await world.start?.();
});
