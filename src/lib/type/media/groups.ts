import {
    ListProps,
    Replace,
} from "@type/utils";
import * as contents from "./contents";

export type PartialMediaGroup = {
    id: string;
    description?: string;
    mediaContentIds: string[];
    mediaContents?: contents.PartialMediaContent[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaGroup = Replace<PartialMediaGroup, { mediaContents: contents.MediaContent[]; }>;
export type CreateProps = {
    description?: string;
    mediaContents?: string[];
};
export type UpdateProps = {
    description?: string | null;
    mediaContents?: ListProps<string>;
};
