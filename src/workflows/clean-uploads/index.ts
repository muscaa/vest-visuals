import { abortStaleMultipartUploads, deleteAbandonedUploads } from "./steps";

/**
 * Throws away uploads started over a day ago and never completed, their rows and their parts.
 * TODO: not started by anything yet; run it with the other daily jobs from the scheduled workflow.
 */
export async function cleanUploads() {
    "use workflow";

    const abortedParts = await abortStaleMultipartUploads();
    const deletedRows = await deleteAbandonedUploads();
    return { abortedParts, deletedRows };
}
