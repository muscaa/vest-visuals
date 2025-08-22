import * as base from "./base";
import * as image from "./image";
import * as video from "./video";

type Select<K, V extends base.ProcessorConfig> = {
    id: K;
} & V;

export type MediaProcessor = Select<"none", base.ProcessorConfig>
    | Select<"image-sharp-v1", image.V1SharpProcessorConfig>
    ;
