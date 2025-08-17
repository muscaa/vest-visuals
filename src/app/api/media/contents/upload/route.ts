import { NextRequest } from "next/server";
import * as types from "@/types/api/media/contents/upload";
import {
    createClientDB,
    usersDB,
    newMediaContentsDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";
import { mediaProcessors } from "@/utils/server/media/processor";
import { Blob } from "buffer";

export async function POST(request: NextRequest) {
    const pb = await createClientDB();

    const user = await usersDB.get({
        pb,
        cookies: request.cookies,
        redirect: false,
    });
    if (!user) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
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
        });
    }

    const result: newMediaContentsDB.Record[] = [];
    for (let i = 0; i < json.files.length; i++) {
        const file = json.files[i];
        const config = json.configs[i];

        const Processor = mediaProcessors[config.processor.id];
        if (!Processor) {
            continue;
        }

        const processor = new Processor();
        const buffer = Buffer.from(await file.arrayBuffer());

        let mediaContent: newMediaContentsDB.Record | undefined;
        await processor.process(
            buffer,
            config.processor,
            async (value) => {
                if (!mediaContent) {
                    const result = await newMediaContentsDB.create({
                        pb,
                        value: {
                            mediaVariants: [
                                {
                                    variant: value.variant,
                                    file: new Blob([value.buffer], { type: value.mimeType }),
                                    type: value.type,
                                    info: value.info,
                                }
                            ],
                        },
                    });
                    if (!result) {
                        return false;
                    }

                    mediaContent = result;
                } else {
                    const result = await newMediaContentsDB.update({
                        pb,
                        id: mediaContent.id,
                        value: {
                            mediaVariants: {
                                append: [
                                    {
                                        variant: value.variant,
                                        file: new Blob([value.buffer], { type: value.mimeType }),
                                        type: value.type,
                                        info: value.info,
                                    }
                                ]
                            },
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
        values: result.map((value) => ({
            id: value.id,
            mediaVariants: value.mediaVariants,
            created: value.created,
            updated: value.updated,
        })),
    });
}
