import { Response } from "@type/http";

// POST

export type PostRequest = {
    id: string;
    description?: string;
    mediaContents?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export type PostResponse = Response<{}>;
