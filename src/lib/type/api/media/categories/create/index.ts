import { Response } from "@type/http";
import {
    PartialMediaCategory,
    CreateProps,
} from "@type/media/categories";

// POST

export type PostRequest = {
    value: CreateProps;
};

export type PostResponse = Response<{
    value: PartialMediaCategory;
}>;
