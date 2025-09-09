import { Response } from "@shared/types/http";

// POST

export type PostRequest = {
    input: string;
};

export type PostResponse = Response<{
    output: string[]; // TODO stream output
}>;
