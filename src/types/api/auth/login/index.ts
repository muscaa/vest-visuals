import { Response } from "@/types/http";

// POST

export type PostRequest = {
    token: string;
    email: string;
    password: string;
};

export type PostResponse = Response<{}>;
