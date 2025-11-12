import { MediaTypeInfo } from "@type/media/info";
import type { Blob } from "buffer";

export type AlbumVariant =
    {
        contentId: string;
        variant: string;
        order: number;
        fileUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
    & MediaTypeInfo;
export type CreateProps =
    {
        contentId: string;
        variant: string;
        order?: number;
        blob: Blob;
    }
    & MediaTypeInfo;
export type UpdateProps = Partial<CreateProps>;
