import { Response } from "@shared/types/http";

// POST

export type PostRequest = {
    token: string;
    email: string;
    password: string;
};

export type PostResponse = Response<{}>;
