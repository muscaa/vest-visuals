import { Response } from "@shared/types/http";

// POST

export type PostRequest = {
    token: string;
    name: string;
    email: string;
    message: string;
};

export type PostResponse = Response<{}>;
