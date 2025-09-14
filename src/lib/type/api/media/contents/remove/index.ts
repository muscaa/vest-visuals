import { Response } from "@type/http";

// POST

export type PostRequest = {
    ids: string[];
};

export type PostResponse = Response<{}>;
