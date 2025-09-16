import { ProcessorConfig } from "@type/media/processor/base";
import * as base from "./base";
import * as image from "./image";
import * as video from "./video";

export const mediaProcessors: { [key: string]: new () => base.Processor<ProcessorConfig>; } = {
    "image-sharp-v1": image.V1SharpProcessor,
};
