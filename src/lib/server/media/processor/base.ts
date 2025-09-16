import { ProcessorConfig } from "@type/media/processor/base";
import { MediaTypeInfo } from "@type/media/info";

export type ProcessorValue = MediaTypeInfo & {
    variant: string;
    buffer: Buffer;
    mimeType: string;
};

export abstract class Processor<V extends ProcessorConfig> {

    abstract process(buffer: Buffer, config: V, func: (value: ProcessorValue) => Promise<boolean>): Promise<boolean>;
}
