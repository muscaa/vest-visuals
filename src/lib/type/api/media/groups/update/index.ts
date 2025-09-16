import { Response } from "@type/http";
import { UpdateProps } from "@type/media/groups";

// POST

export type PostRequest = {
    id: string;
    value: UpdateProps;
};

export type PostResponse = Response<{}>;
