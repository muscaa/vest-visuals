import { Response } from "@type/http";
import { PartialMediaCategory } from "@type/media/categories";

// POST

export type PostRequest = {
};

export type PostResponse = Response<{
    values: PartialMediaCategory[];
}>;
