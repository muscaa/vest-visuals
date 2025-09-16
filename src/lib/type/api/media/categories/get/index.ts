import { Response } from "@type/http";
import { MediaCategory } from "@type/media/categories";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: MediaCategory;
}>;
