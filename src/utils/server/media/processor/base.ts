import PocketBase from "pocketbase";
import { ProcessorConfig } from "@/types/media/processor/base";
import { FormDataJson } from "@/types/api/media/upload";
import { MediaVariantsRecord } from "@/types/db/mediaVariants";

export interface UploadProps<V extends ProcessorConfig> {
    pb?: PocketBase;
    buffer: Buffer;
    json: FormDataJson;
    config: V;
}

export abstract class Processor<V extends ProcessorConfig> {

    abstract upload(props: UploadProps<V>): Promise<MediaVariantsRecord | null>;
}
