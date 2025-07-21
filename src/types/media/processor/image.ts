import * as base from "@/types/media/processor/base";

interface ProcessorConfig extends base.ProcessorConfig {
    alt?: string;
}

export interface V1SharpProcessorConfig extends ProcessorConfig {
    variants: base.VariantMap<{
        qualityPercent?: number;
        size?: Partial<base.Size> & {
            scalePercent?: number;
            scaleUnit?: number;
        };
    }>;
}
