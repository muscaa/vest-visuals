import { ProcessorConfig } from "@/types/media/processor/base";
import { FormDataJson } from "@/types/api/media/upload";
import {
    MediaRecord,
    MediaValue,
} from "@/types/db/media";

export abstract class Processor<V extends ProcessorConfig> {

    abstract upload(buffer: Buffer, json: FormDataJson, config: V, func: (value: MediaValue) => Promise<MediaRecord | null>): Promise<MediaRecord[]>;
}
