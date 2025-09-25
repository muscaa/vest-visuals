import * as base from "./base";

interface ProcessorConfig extends base.ProcessorConfig {
    alt?: string;
}

export interface V1SharpProcessorConfig extends ProcessorConfig {
    variants: base.VariantMap<{
        order?: number;
        qualityPercent?: number;
        size?: Partial<base.Size> & {
            scalePercent?: number;
            scaleUnit?: number;
        };
    }>;
}
