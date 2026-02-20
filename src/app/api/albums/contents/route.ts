import { NextRequest } from "next/server";
import { Response } from "@type/http";
import { response } from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/albums/contents";
import * as contents from "@server/albums/contents";
import { safeJSON } from "@server/http";
import { mediaProcessors } from "@server/media/processor";
import { Blob } from "buffer";
import { ProcessorValue } from "@server/media/processor/base";

export async function POST(request: NextRequest): Response<types.PartialAlbumsContent> {
    const admin = await isAdmin({ request });
    if (!admin) {
        return response(["UNAUTHORIZED", "Unauthorized"]);
    }

    const formData = await request.formData();

    const content: types.CreateFormData.content | null = await safeJSON(formData.get(types.CreateFormData.content) as string, (json) => json.albumId && json.path /* && json.order */ && json.type);
    if (!content) {
        return response(["BAD_REQUEST", "Missing content properties"]);
    }

    if (content.type === "media") {
        const mediaFile: types.CreateFormData.mediaFile | null = formData.get(types.CreateFormData.mediaFile) as File;
        const mediaConfig: types.CreateFormData.mediaConfig | null = await safeJSON(formData.get(types.CreateFormData.mediaConfig) as string, (json) => json.processor && json.processor.id);
        if (!mediaFile || !mediaConfig) {
            return response(["BAD_REQUEST", "Invalid media form data"]);
        }

        const Processor = mediaProcessors[mediaConfig.processor.id];
        if (!Processor) {
            return response(["BAD_REQUEST", "Invalid processor ID"]);
        }

        const processor = new Processor();
        const buffer = Buffer.from(await mediaFile.arrayBuffer());

        const values: ProcessorValue[] = [];
        const processed = await processor.process(
            buffer,
            mediaConfig.processor,
            async (value) => {
                values.push(value);
                return true;
            }
        );
        if (!processed) {
            return response(["INTERNAL_SERVER_ERROR", "Processing failed"]);
        }

        const result = await contents.create({
            albumId: content.albumId,
            path: content.path,
            order: content.order,
            type: content.type,
            albumsMedia: {
                albumsMediaVariants: values.map((value) => ({
                    tag: value.tag,
                    order: value.order,
                    blob: new Blob([Buffer.from(value.buffer)], { type: value.mimeType }),
                    type: value.type,
                    info: value.info,
                })),
            },
        });
        if (!result) {
            return response(["INTERNAL_SERVER_ERROR", "Could not create media content"]);
        }

        return response(["OK", result]);
    } else if (content.type === "directory") {
        const directory: types.CreateFormData.directory | null = await safeJSON(formData.get(types.CreateFormData.directory) as string, (json) => json.name);
        if (!directory) {
            return response(["BAD_REQUEST", "Invalid directory form data"]);
        }

        const result = await contents.create({
            albumId: content.albumId,
            path: content.path,
            order: content.order,
            type: content.type,
            albumsDirectory: {
                name: directory.name,
                cover: directory.cover,
            },
        });
        if (!result) {
            return response(["INTERNAL_SERVER_ERROR", "Could not create directory content"]);
        }

        return response(["OK", result]);
    }

    return response(["BAD_REQUEST", "Invalid content type"]);
}
