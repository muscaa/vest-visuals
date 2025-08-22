import { Response } from "@shared/types/http";
import { MediaGroup } from "..";

// POST

export type PostRequest = {
    mediaContents?: string[];
};

export type PostResponse = Response<{
    value: MediaGroup;
}>;
