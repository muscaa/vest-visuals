/**
 * Nitro's scheduled task, run inside the server's own process every night at 3:00 (`scheduledTasks` in
 * vite.config.ts; Nitro names it after this file): no route, nothing reachable from outside. It only starts the `dailyJobs` workflow, which does the
 * work with retries. In development it's run by hand, from Nitro's dev-only `/_nitro/tasks/daily`.
 */
import { defineTask } from "nitro/task";
import { start } from "workflow/api";
import { dailyJobs } from "@/workflows/daily";

export default defineTask({
    meta: { name: "daily", description: "Starts the nightly jobs: deleting expired albums, cleaning abandoned uploads" },
    async run() {
        const run = await start(dailyJobs);
        return { result: { runId: run.runId } };
    },
});
