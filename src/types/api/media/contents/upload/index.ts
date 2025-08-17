import { MediaProcessor } from "@/types/media/processor";
import { MediaContent } from "@/types/api/media/contents";

// POST

export const formData = {
    files: "files",
    configs: "configs",
};

export namespace formData {
    export type files = File[];
    export type configs = FileConfig[];
}

export type FileConfig = {
    variant: string;
    processor: MediaProcessor;
};

export type PostResponse = {
    success: boolean;
    values?: MediaContent[];
};
