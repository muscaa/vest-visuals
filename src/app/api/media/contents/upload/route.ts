import { NextRequest } from "next/server";
import * as types from "@/types/api/media/contents/upload";
import {
    createClientDB,
    usersDB,
    newMediaContentsDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";

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

    const files: types.formData.files = formData.getAll(types.formData.files) as File[];
    const configs: types.formData.configs = (await Promise.all((formData.getAll(types.formData.configs) as string[])
            .flatMap(async (value) => {
                const config = await safeJSON<types.FileConfig>(value, (json) => json.processor && json.processor.id);

                return config ? [config] : [];
            }))).flat();

    if (files.length > configs.length) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    // TODO

    /*
    const values: MediaVariantsRecord[] = [];

    for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const json = jsonArray[i];

        const Processor = mediaProcessors[json.processorConfig.id];
        if (!Processor) {
            continue;
        }

        const processor = new Processor();
        const buffer = Buffer.from(await file.arrayBuffer());
        
        const uploaded = await processor.upload({
            pb,
            buffer,
            json,
            config: json.processorConfig,
        });
        if (!uploaded) {
            continue;
        }

        values.push(uploaded);
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values,
    });
    */
}
