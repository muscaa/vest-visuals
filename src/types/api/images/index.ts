import {
    ImagesRecord,
} from "@/types/db/images";

// POST

export interface PostRequest extends Request {
    filter?: string;
    sort?: string;
    
    // TODO: add pagination
}

export interface PostResponse extends Response {
    success: boolean;
    value?: ImagesRecord[];
}
