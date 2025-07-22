import * as base from "@/utils/server/media/processor/base";
import { V1SharpProcessorConfig } from "@/types/media/processor/image";
import { MediaRecord } from "@/types/db/media";
import { MediaVariantsRecord } from "@/types/db/mediaVariants";
import sharp from "sharp";
import {
    mediaDB,
    mediaVariantsDB,
} from "@/utils/server/db";

export class V1SharpProcessor extends base.Processor<V1SharpProcessorConfig> {

    async upload(props: base.UploadProps<V1SharpProcessorConfig>): Promise<MediaVariantsRecord | null> {
        const original = sharp(props.buffer);
        const metadata = await original.metadata();

        const media: MediaRecord[] = [];

        for (const [key, variant] of Object.entries(props.config.variants)) {
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
                .webp({
                    quality: qualityPercent,
                })
                .toBuffer();

            const record = await mediaDB.create({
                pb: props.pb,
                value: {
                    variant: key,
                    file: new Blob([processed], { type: "image/webp" }),
                    type: "image",
                    info: {
                        alt: props.config.alt || key,
                        width: width,
                        height: height,
                    },
                },
            });
            if (!record) continue;

            media.push(record);
        }

        if (media.length == 0) return null;

        const mediaVariant = await mediaVariantsDB.create({
            pb: props.pb,
            value: {
                media: media.map((record) => record.id),
            },
        });
        if (!mediaVariant) return null;

        mediaVariant.expand = {
            media,
        };

        return mediaVariant;
    }
}
