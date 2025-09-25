import * as base from "./base";
import { V1SharpProcessorConfig } from "@type/media/processor/image";
import sharp from "sharp";

export class V1SharpProcessor extends base.Processor<V1SharpProcessorConfig> {

    async process(
        buffer: Buffer,
        config: V1SharpProcessorConfig,
        func: (value: base.ProcessorValue) => Promise<boolean>
    ): Promise<boolean> {
        const original = sharp(buffer);
        const metadata = await original.metadata();

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
                .webp({
                    quality: qualityPercent,
                })
                .toBuffer();

            const value: base.ProcessorValue = {
                variant: key,
                order: variant.order,
                buffer: processed,
                mimeType: "image/webp",
                type: "image",
                info: {
                    alt: config.alt || key,
                    width: width,
                    height: height,
                },
            };

            const result = await func(value);
            if (!result) {
                return false;
            }
        }

        return true;
    }
}
