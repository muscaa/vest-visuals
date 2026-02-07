import { NextRequest } from "next/server";
import { response } from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/portfolio/media";
import * as media from "@server/portfolio/media";
import { safeJSON } from "@server/http";
import { mediaProcessors } from "@server/media/processor";
import { Blob } from "buffer";
import { ProcessorValue } from "@server/media/processor/base";

export async function PUT(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
        return response(["UNAUTHORIZED", "Unauthorized"]);
    }

    const formData = await request.formData();

    const file: types.UploadFormData.file | null = formData.get(types.UploadFormData.file) as File;
    const config: types.UploadFormData.config | null = await safeJSON(formData.get(types.UploadFormData.config) as string, (json) => json.processor && json.processor.id);

    if (!file || !config) {
        return response(["BAD_REQUEST", "Invalid form data"]);
    }

    const Processor = mediaProcessors[config.processor.id];
    if (!Processor) {
        return response(["BAD_REQUEST", "Invalid processor ID"]);
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
        return response(["INTERNAL_SERVER_ERROR", "Processing failed"]);
    }

    const result = await media.create({
        portfolioMediaVariants: values.map((value) => ({
            tag: value.tag,
            order: value.order,
            blob: new Blob([Buffer.from(value.buffer)], { type: value.mimeType }),
            type: value.type,
            info: value.info,
        })),
    });
    if (!result) {
        return response(["INTERNAL_SERVER_ERROR", "Could not create media"]);
    }

    return response(["OK", result]);
}
