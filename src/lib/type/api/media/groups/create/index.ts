import { Response } from "@type/http";
import {
    PartialMediaGroup,
    CreateProps,
} from "@type/media/groups";

// POST

export type PostRequest = {
    value: CreateProps;
};

export type PostResponse = Response<{
    value: PartialMediaGroup;
}>;
