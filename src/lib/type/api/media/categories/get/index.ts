import { Response } from "@type/http";
import { FullMediaCategory } from "..";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaCategory;
}>;
