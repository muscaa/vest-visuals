import { Response } from "@type/http";
import { MediaGroup } from "@type/media/groups";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: MediaGroup;
}>;
