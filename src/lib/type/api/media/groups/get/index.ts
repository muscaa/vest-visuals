import { Response } from "@type/http";
import { FullMediaGroup } from "..";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaGroup;
}>;
