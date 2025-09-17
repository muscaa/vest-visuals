import { Response } from "@type/http";

// POST

export type PostRequest = {
    name: string;
};

export type PostResponse = Response<{
    value: any;
}>;
