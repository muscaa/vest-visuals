import { NextRequest } from "next/server";
import * as types from "@type/api/media/contents/upload";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { auth } from "@server/auth";
import * as contents from "@server/media/contents";
import { mediaProcessors } from "@server/media/processor";
import { Blob } from "buffer";
import { PartialMediaContent } from "@type/media/contents";

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const formData = await request.formData();

    const json: types.PostRequest = {
        files: formData.getAll(types.formData.files) as File[],
        configs: (await Promise.all((formData.getAll(types.formData.configs) as string[])
            .flatMap(async (value) => {
                const config = await safeJSON<types.FileConfig>(value, (json) => json.processor && json.processor.id);

                return config ? [config] : [];
            }))).flat(),
    };

    if (json.files.length > json.configs.length) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Mismatch between number of files and configs",
        });
    }

    const result: PartialMediaContent[] = [];
    for (let i = 0; i < json.files.length; i++) {
        const file = json.files[i];
        const config = json.configs[i];

        const Processor = mediaProcessors[config.processor.id];
        if (!Processor) {
            continue;
        }

        const processor = new Processor();
        const buffer = Buffer.from(await file.arrayBuffer());

        let mediaContent: PartialMediaContent | undefined;
        await processor.process(
            buffer,
            config.processor,
            async (value) => {
                if (!mediaContent) {
                    const result = await contents.create({
                        mediaVariants: [
                            {
                                variant: value.variant,
                                blob: new Blob([value.buffer], { type: value.mimeType }),
                                type: value.type,
                                info: value.info,
                            },
                        ],
                    });
                    if (!result) {
                        return false;
                    }

                    mediaContent = result;
                } else {
                    const result = await contents.update(mediaContent.id, {
                        mediaVariants: {
                            append: [
                                {
                                    variant: value.variant,
                                    blob: new Blob([value.buffer], { type: value.mimeType }),
                                    type: value.type,
                                    info: value.info,
                                },
                            ],
                        },
                    });
                    if (!result) {
                        return false;
                    }
                }

                return true;
            }
        );

        if (mediaContent) {
            result.push(mediaContent);
        }
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result,
    });
}
