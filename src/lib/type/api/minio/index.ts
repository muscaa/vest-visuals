import { Response } from "@type/http";

// POST

export type PostRequest = {};

export type PostResponse = Response<{
    url: string;
}>;
