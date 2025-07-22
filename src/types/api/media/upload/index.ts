import { MediaVariantsRecord } from "@/types/db/mediaVariants";
import { MediaProcessor } from "@/types/media/processor";

// POST

export const formDataEntries = {
    fileArray: "files",
    jsonArray: "json",
};

export interface FormDataJson {
    id?: string;
    variant?: string;
    processorConfig: MediaProcessor;
}

export interface PostResponse {
    success: boolean;
    values?: MediaVariantsRecord[];
}
