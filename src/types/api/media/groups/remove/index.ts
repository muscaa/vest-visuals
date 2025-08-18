import { Response } from "@/types/http";

// POST

export type PostRequest = {
    ids: string[];
};

export type PostResponse = Response<{}>;
