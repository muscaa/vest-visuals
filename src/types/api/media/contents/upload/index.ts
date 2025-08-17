import { MediaProcessor } from "@/types/media/processor";
import { MediaContent } from "@/types/api/media/contents";

// POST

export const formData = {
    jsons: "jsons",
    files: "files",
};

export namespace formData {
    export type jsons = JsonFormData[];
    export type files = File[];
}

export type JsonFormData = {
    variant: string;
    config: MediaProcessor;
};

export type PostResponse = {
    success: boolean;
    values?: MediaContent[];
};
