import { Response } from "@shared/types/http";
import { FullMediaContent } from "..";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaContent;
}>;
