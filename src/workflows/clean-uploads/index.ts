import { abortStaleMultipartUploads, deleteAbandonedUploads } from "./steps";

/** Throws away uploads started over a day ago and never completed, their rows and their parts; one of the `dailyJobs`. */
export async function cleanUploads() {
    "use workflow";

    const abortedParts = await abortStaleMultipartUploads();
    const deletedRows = await deleteAbandonedUploads();
    return { abortedParts, deletedRows };
}
