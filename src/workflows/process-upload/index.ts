import { processAsset } from "./asset";
import { deleteUploadedFile, loadUpload, setUploadStatus } from "./steps";

/**
 * Turns a completed upload into what it was uploaded for, by its type; started by `completeUpload`. The uploaded file
 * is deleted at the end, whether it worked or not, and the upload's status says which.
 */
export async function processUpload(id: string) {
    "use workflow";

    const upload = await loadUpload(id);
    await setUploadStatus(upload, "processing");

    try {
        switch (upload.type) {
            case "asset":
                await processAsset(upload);
                break;
        }
        await setUploadStatus(upload, "done");
    } catch (error) {
        await setUploadStatus(upload, "failed");
        throw error;
    } finally {
        await deleteUploadedFile(id);
    }
}
