import { Response } from "@type/http";
import { MediaContent } from "@type/media/contents";

// POST

export type PostRequest = {
};

export type PostResponse = Response<{
    values: MediaContent[];
}>;
