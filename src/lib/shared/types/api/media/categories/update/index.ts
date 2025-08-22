import { Response } from "@shared/types/http";

// POST

export type PostRequest = {
    id: string;
    category?: string;
    mediaGroups?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export type PostResponse = Response<{}>;
