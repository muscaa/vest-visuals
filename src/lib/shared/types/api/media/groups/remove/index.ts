import { Response } from "@shared/types/http";

// POST

export type PostRequest = {
    ids: string[];
};

export type PostResponse = Response<{}>;
