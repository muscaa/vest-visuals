import { NextRequest } from "next/server";
import * as types from "@/types/api/media/upload";
import {
    createClientDB,
    usersDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";
import { mediaProcessors } from "@/utils/server/media/processor";
import { MediaVariantsRecord } from "@/types/db/mediaVariants";

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

    const fileArray = formData.getAll(types.formDataEntries.fileArray) as File[];
    const jsonArrayEntry = formData.getAll(types.formDataEntries.jsonArray) as string[];

    const jsonArray = (await Promise.all(jsonArrayEntry.flatMap(async (entry) => {
        const json = await safeJSON<types.FormDataJson>(entry, (json) => json.processorConfig && json.processorConfig.id);

        return json ? [json] : [];
    }))).flat();

    if (jsonArray.length < fileArray.length) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

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
}
