/**
 * Uploading a file of any size from the browser: split into parts sent straight to S3, a few at a time, then
 * completed, after which the server processes it in the background. See `@/functions/uploads`.
 */
import type { UploadTarget } from "@shared/uploads";
import { cancelUpload, completeUpload, signUploadParts, startUpload } from "@/functions/uploads";

/** parts sent at the same time */
const concurrency = 4;
/** parts whose links are asked for at once; not too many, they expire after an hour */
const signAhead = 20;
/** tries per part, as a connection can drop for a moment */
const partAttempts = 3;

export interface UploadFileOptions {
    file: File;
    target: UploadTarget;
    /** from 0 to 1, as the parts go out */
    onProgress?: (progress: number) => void;
    signal?: AbortSignal;
}

/**
 * Uploads the file and completes it, returning the upload's id; the server processes it after, on its own. Stopped
 * through `signal` or failed, nothing is left behind.
 */
export async function uploadFile(options: UploadFileOptions) {
    const { file } = options;
    const { id, partSize, partCount } = await startUpload({
        data: { target: options.target, file: { name: file.name, type: file.type, size: file.size } },
    });

    try {
        const parts = await uploadParts({ ...options, id, partSize, partCount });
        await completeUpload({ data: { id, parts } });
        return id;
    } catch (error) {
        await cancelUpload({ data: { id } }).catch(() => undefined);
        throw error;
    }
}

//
// parts
//

async function uploadParts(options: UploadFileOptions & { id: string; partSize: number; partCount: number }) {
    const { file, id, partSize, partCount } = options;
    // one failed part stops the others
    const stop = new AbortController();
    const signal = options.signal ? AbortSignal.any([options.signal, stop.signal]) : stop.signal;

    const sent = new Array<number>(partCount).fill(0);
    const report = () => options.onProgress?.(sent.reduce((sum, bytes) => sum + bytes, 0) / file.size);

    // links are asked for in batches, as the parts get to them
    const links = new Map<number, Promise<string>>();
    const linkFor = (part: number) => {
        if (!links.has(part)) {
            const partNumbers = Array.from({ length: Math.min(signAhead, partCount - part + 1) }, (_, index) => part + index);
            const signed = signUploadParts({ data: { id, partNumbers } });
            partNumbers.forEach((number, index) => links.set(number, signed.then((urls) => urls[index])));
        }
        return links.get(part)!;
    };

    const parts: { partNumber: number; etag: string }[] = [];
    let next = 1;

    const worker = async () => {
        while (next <= partCount) {
            const part = next++;
            const body = file.slice((part - 1) * partSize, part * partSize);

            for (let attempt = 1; ; attempt++) {
                try {
                    const etag = await putPart(await linkFor(part), body, signal, (bytes) => {
                        sent[part - 1] = bytes;
                        report();
                    });
                    parts.push({ partNumber: part, etag });
                    break;
                } catch (error) {
                    sent[part - 1] = 0;
                    if (signal.aborted || attempt === partAttempts) throw error;
                }
            }
        }
    };

    try {
        await Promise.all(Array.from({ length: Math.min(concurrency, partCount) }, worker));
    } catch (error) {
        stop.abort(error);
        throw error;
    }
    return parts;
}

/** Sends one part, returning its ETag. Through XHR, as `fetch` can't tell how much of a body went out. */
function putPart(url: string, body: Blob, signal: AbortSignal, onProgress: (bytes: number) => void) {
    return new Promise<string>((resolve, reject) => {
        signal.throwIfAborted();

        const request = new XMLHttpRequest();
        request.open("PUT", url);
        request.upload.onprogress = (event) => onProgress(event.loaded);
        request.onload = () => {
            if (request.status < 200 || request.status >= 300) {
                reject(new Error(`S3 refused a part: ${request.status}`));
                return;
            }
            const etag = request.getResponseHeader("ETag");
            // the bucket's CORS must expose it to the browser
            etag ? resolve(etag) : reject(new Error("S3 sent no ETag for a part; the uploads bucket's CORS must expose it"));
        };
        request.onerror = () => reject(new Error("A part couldn't be sent"));
        request.onabort = () => reject(signal.reason);

        signal.addEventListener("abort", () => request.abort(), { once: true });
        request.send(body);
    });
}
