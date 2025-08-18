import { Response } from "@/types/http";
import { MediaGroup } from "@/types/api/media/groups";

// POST

export type PostRequest = {
    mediaContents?: string[];
};

export type PostResponse = Response<{
    value: MediaGroup;
}>;
