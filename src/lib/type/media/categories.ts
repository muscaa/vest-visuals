import {
    ListProps,
    Replace,
} from "@type/utils";
import * as groups from "./groups";

export type PartialMediaCategory = {
    id: string;
    category: string;
    mediaGroupIds: string[];
    mediaGroups?: groups.PartialMediaGroup[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaCategory = Replace<PartialMediaCategory, { mediaGroups: groups.MediaGroup[]; }>;
export type CreateProps = {
    category: string;
    mediaGroups?: string[];
};
export type UpdateProps = {
    category?: string;
    mediaGroups?: ListProps<string>;
};
