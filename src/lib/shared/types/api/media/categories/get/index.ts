import { Response } from "@shared/types/http";
import { FullMediaCategory } from "..";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaCategory;
}>;
