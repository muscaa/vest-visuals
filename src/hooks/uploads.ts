import { m } from "@shared/paraglide/messages";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@client/upload";
import type { UploadTarget } from "@shared/uploads";

/**
 * Sending one file, for a form: `upload` returns an error message, or nothing once the file is sent, as
 * `useFormSubmit` expects; the server processes it after, on its own. Leaving the page stops one still sending.
 */
export function useUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const controller = useRef<AbortController>(undefined);

    useEffect(() => () => controller.current?.abort(), []);

    const upload = async (file: File, target: UploadTarget): Promise<string | undefined> => {
        controller.current = new AbortController();
        const { signal } = controller.current;

        setUploading(true);
        setProgress(0);
        try {
            await uploadFile({ file, target, signal, onProgress: setProgress });
        } catch {
            return signal.aborted ? undefined : m.admin_upload_failed();
        } finally {
            setUploading(false);
        }
    };

    /** Stops sending; the parts sent so far are thrown away. */
    const cancel = () => controller.current?.abort();

    return { uploading, progress, upload, cancel };
}
