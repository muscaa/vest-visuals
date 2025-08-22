import { Response } from "@shared/types/http";
import { FullMediaGroup } from "..";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaGroup;
}>;
