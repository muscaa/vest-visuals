import { FullMediaGroup } from "@/types/api/media/groups";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = {
    success: boolean;
    value?: FullMediaGroup;
};
