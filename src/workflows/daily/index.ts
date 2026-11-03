import { start } from "workflow/api";
import { deleteExpiredAlbums } from "../albums";
import { cleanUploads } from "../clean-uploads";

/**
 * The jobs run every night, started by the `daily` task at 3:00: each one its own run, with its own retries, so one
 * failing doesn't stop the others. Add new daily jobs here.
 */
export async function dailyJobs() {
    "use workflow";

    const runs = [
        await start(deleteExpiredAlbums),
        await start(cleanUploads),
    ];
    return { runIds: runs.map((run) => run.runId) };
}
