import { ProcessorConfig } from "@/types/media/processor/base";
import * as base from "@/utils/server/media/processor/base";
import * as image from "@/utils/server/media/processor/image";
import * as video from "@/utils/server/media/processor/video";

export const mediaProcessors: { [key: string]: new () => base.Processor<ProcessorConfig>; } = {
    "image-sharp-v1": image.V1SharpProcessor,
};
