import { Response } from "@/types/http";
import { FullMediaCategory } from "@/types/api/media/categories";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaCategory;
}>;
