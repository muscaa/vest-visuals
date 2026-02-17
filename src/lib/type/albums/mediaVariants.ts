import {
    MediaTypeInfo,
    MediaInfo,
} from "@type/media/info";
import type { Blob } from "buffer";

export type AlbumsMediaVariant =
    {
        mediaId: string;
        tag: string;
        order: number;
        fileUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
    & MediaTypeInfo;
export type SelectProps = {
    mediaId: string;
    tag: string;
    order: number;
    type: "image" | "video";
    info: MediaInfo | null;
    createdAt: Date;
    updatedAt: Date;
};
export type CreateProps =
    {
        mediaId: string;
        tag: string;
        order?: number;
        blob: Blob;
    }
    & MediaTypeInfo;
export type UpdateProps = Partial<CreateProps>;
