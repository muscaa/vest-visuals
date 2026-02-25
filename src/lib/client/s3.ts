import {
    MultipartUpload,
    MultipartUploadPart,
} from "@type/s3";

const CHUNK_SIZE = 10 * 1024 * 1024;
const CONCURRENCY_LIMIT = 4;

interface DirectMultipartUploadProps {
    file: File;
    start: (partCount: number) => Promise<MultipartUpload>;
    finish: (uploadId: string, parts: MultipartUploadPart[]) => Promise<boolean>;
    onProgress?: (at: number, max: number) => void;
}

export async function directMultipartUpload(props: DirectMultipartUploadProps): Promise<boolean> {
    const partCount = Math.ceil(props.file.size / CHUNK_SIZE);

    const startResult = await props.start(partCount);

    const parts: MultipartUploadPart[] = [];
    const queue = [...startResult.presignedUrls.entries()];

    const worker = async () => {
        while (queue.length > 0) {
            const [index, url] = queue.shift()!;
            const chunk = props.file.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);

            const res = await fetch(url, {
                method: "PUT",
                body: chunk,
            });
            const etag = res.headers.get("ETag");
            if (!etag) {
                console.log("Missing ETag header");
                continue;
            }

            parts.push({ ETag: etag, PartNumber: index + 1 });

            props.onProgress?.(parts.length, partCount);
        }
    };

    await Promise.all(Array.from({ length: CONCURRENCY_LIMIT }, worker));

    return await props.finish(startResult.uploadId, parts.sort((a, b) => a.PartNumber - b.PartNumber));
}
