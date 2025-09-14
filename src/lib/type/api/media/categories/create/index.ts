import { Response } from "@type/http";
import { MediaCategory } from "..";

// POST

export type PostRequest = {
    category: string;
    mediaGroups?: string[];
};

export type PostResponse = Response<{
    value: MediaCategory;
}>;
