import { Response } from "@type/http";

// POST

export type PostRequest = {
    name: string;
    value: any;
};

export type PostResponse = Response<{}>;
