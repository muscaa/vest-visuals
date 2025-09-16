import { Response } from "@type/http";
import { MediaContent } from "@type/media/contents";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: MediaContent;
}>;
