import { Response } from "@shared/types/http";

// POST

export type PostRequest = {
    id: string;
    mediaContents?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export type PostResponse = Response<{}>;
