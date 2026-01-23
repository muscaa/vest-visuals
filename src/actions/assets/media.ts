"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/assets/media";
import * as media from "@server/assets/media";
import { safeJSON } from "@server/http";
import { mediaProcessors } from "@server/media/processor";
import { Blob } from "buffer";
import { ProcessorValue } from "@server/media/processor/base";

export async function get(id: string): ActionResponse<types.AssetsMedia> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing media ID"];
    }

    const result = await media.get(id);
    if (!result) {
        return ["NOT_FOUND", "Media not found"];
    }

    return ["OK", result];
}

export async function getAll(): ActionResponse<types.AssetsMedia[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await media.getAll();
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve media"];
    }

    return ["OK", result];
}

export async function upload(formData: FormData): ActionResponse<types.PartialAssetsMedia> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const file: types.UploadFormData.file | null = formData.get(types.UploadFormData.file) as File;
    const config: types.UploadFormData.config | null = await safeJSON(formData.get(types.UploadFormData.config) as string, (json) => json.processor && json.processor.id);

    if (!file || !config) {
        return ["BAD_REQUEST", "Invalid form data"];
    }

    const Processor = mediaProcessors[config.processor.id];
    if (!Processor) {
        return ["BAD_REQUEST", "Invalid processor ID"];
    }

    const processor = new Processor();
    const buffer = Buffer.from(await file.arrayBuffer());

    const values: ProcessorValue[] = [];
    const processed = await processor.process(
        buffer,
        config.processor,
        async (value) => {
            values.push(value);
            return true;
        }
    );
    if (!processed) {
        return ["INTERNAL_SERVER_ERROR", "Processing failed"];
    }

    const result = await media.create({
        assetsMediaVariants: values.map((value) => ({
            tag: value.tag,
            order: value.order,
            blob: new Blob([Buffer.from(value.buffer)], { type: value.mimeType }),
            type: value.type,
            info: value.info,
        })),
    });
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not create media"];
    }

    return ["OK", result];
}

export async function remove(ids: string[]): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!ids || ids.length === 0) {
        return ["BAD_REQUEST", "No media IDs provided"];
    }

    const result = await media.removeList(ids);
    if (!result) {
        return ["NOT_FOUND", "Media not found"];
    }

    return ["OK"];
}
