import { Response } from "@shared/types/http";
import { MediaProcessor } from "@shared/types/media/processor";
import { MediaContent } from "..";

// POST

export const formData = {
    files: "files",
    configs: "configs",
};

export namespace formData {
    export type files = File[];
    export type configs = string[];
}

export type FileConfig = {
    processor: MediaProcessor;
};

export type PostRequest = {
    files: File[];
    configs: FileConfig[];
};

export type PostResponse = Response<{
    values: MediaContent[];
}>;
