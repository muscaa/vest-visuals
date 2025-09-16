import { Response } from "@type/http";
import { UpdateProps } from "@type/media/categories";

// POST

export type PostRequest = {
    id: string;
    value: UpdateProps;
};

export type PostResponse = Response<{}>;
