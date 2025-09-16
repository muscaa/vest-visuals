import { Response } from "@type/http";
import { PartialMediaGroup } from "@type/media/groups";

// POST

export type PostRequest = {
};

export type PostResponse = Response<{
    values: PartialMediaGroup[];
}>;
