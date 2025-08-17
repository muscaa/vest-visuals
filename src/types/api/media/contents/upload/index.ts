import { MediaProcessor } from "@/types/media/processor";

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
    processor: MediaProcessor;
};

export type PostResponse = {
    success: boolean;
};
