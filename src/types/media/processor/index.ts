import * as base from "@/types/media/processor/base";
import * as image from "@/types/media/processor/image";
import * as video from "@/types/media/processor/video";

type Select<K, V extends base.ProcessorConfig> = {
    id: K;
} & V;

export type MediaProcessor = Select<"none", base.ProcessorConfig>
    | Select<"image-sharp-v1", image.V1SharpProcessorConfig>
    ;
