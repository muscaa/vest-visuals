import { MediaTypeInfo } from "@type/media/info";
import type { Blob } from "buffer";

export type AlbumMediaVariant =
    {
        contentId: string;
        tag: string;
        order: number;
        fileUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
    & MediaTypeInfo;
export type CreateProps =
    {
        contentId: string;
        tag: string;
        order?: number;
        blob: Blob;
    }
    & MediaTypeInfo;
export type UpdateProps = Partial<CreateProps>;
