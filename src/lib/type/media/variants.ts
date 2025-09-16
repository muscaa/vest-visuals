import { MediaTypeInfo } from "./info";
import type { Blob } from "buffer";

export type MediaVariant =
    {
        id: string;
        variant: string;
        fileUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
    & MediaTypeInfo;
export type CreateProps =
    {
        variant: string;
        blob: Blob;
    }
    & MediaTypeInfo;
export type UpdateProps = Partial<CreateProps>;
