import * as base from "@/utils/server/media/processor/base";
import { V1SharpProcessorConfig } from "@/types/media/processor/image";
import { FormDataJson } from "@/types/api/media/upload";
import {
    MediaRecord,
    MediaValue,
} from "@/types/db/media";
import sharp from "sharp";

export class V1SharpProcessor extends base.Processor<V1SharpProcessorConfig> {

    async upload(buffer: Buffer, json: FormDataJson, config: V1SharpProcessorConfig, func: (value: MediaValue) => Promise<MediaRecord | null>): Promise<MediaRecord[]> {
        const original = sharp(buffer);
        const metadata = await original.metadata();

        const records: MediaRecord[] = [];

        for (const [key, variant] of Object.entries(config.variants)) {
            if (!variant) continue;

            let width: number = metadata.width;
            let height: number = metadata.height;
            const qualityPercent = variant.qualityPercent ?? 100;

            if (variant.size) {
                const size = variant.size;

                if (size.width && size.height) {
                    width = size.width;
                    height = size.height;
                } else if (size.scalePercent) {
                    const scale = size.scalePercent / 100;

                    width = Math.round(metadata.width * scale);
                    height = Math.round(metadata.height * scale);
                } else if (size.scaleUnit) {
                    if (width > height) {
                        const aspectRatio = metadata.width / metadata.height;

                        width = Math.round(size.scaleUnit * aspectRatio);
                        height = size.scaleUnit;
                    } else {
                        const aspectRatio = metadata.height / metadata.width;

                        width = size.scaleUnit;
                        height = Math.round(size.scaleUnit * aspectRatio);
                    }
                }
            }

            const processed = await original
                .resize({
                    width,
                    height,
                })
                .jpeg({
                    quality: qualityPercent
                })
                .toBuffer();

            const record = await func({
                variant: key,
                file: new Blob([processed], { type: "image/jpeg" }),
                type: "image",
                info: {
                    alt: config.alt,
                    width: width,
                    height: height,
                },
            });
            if (!record) continue;

            records.push(record);
        }

        return records;
    }
}
