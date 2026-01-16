import {
    MediaTypeInfo,
    MediaInfo,
} from "./info";
import type { Blob } from "buffer";

export type MediaVariant =
    {
        contentId: string;
        tag: string;
        order: number;
        fileUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
    & MediaTypeInfo;
export type SelectProps = {
    contentId: string;
    tag: string;
    order: number;
    type: "image" | "video";
    info: MediaInfo | null;
    createdAt: Date;
    updatedAt: Date;
};
export type CreateProps =
    {
        contentId: string;
        tag: string;
        order?: number;
        blob: Blob;
    }
    & MediaTypeInfo;
export type UpdateProps = Partial<CreateProps>;
