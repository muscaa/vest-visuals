import { Response } from "@/types/http";
import { FullMediaGroup } from "@/types/api/media/groups";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaGroup;
}>;
