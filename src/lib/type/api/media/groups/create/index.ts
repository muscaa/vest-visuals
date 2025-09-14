import { Response } from "@type/http";
import { MediaGroup } from "..";

// POST

export type PostRequest = {
    description?: string;
    mediaContents?: string[];
};

export type PostResponse = Response<{
    value: MediaGroup;
}>;
