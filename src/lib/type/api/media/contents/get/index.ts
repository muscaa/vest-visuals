import { Response } from "@type/http";
import { FullMediaContent } from "..";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaContent;
}>;
