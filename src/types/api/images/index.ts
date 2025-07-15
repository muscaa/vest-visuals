import {
    ImagesRecord,
} from "@/types/db/images";

interface Request {
}

interface Response {
    success: boolean;
}

// POST

export interface PostRequest extends Request {
    filter?: string;
    sort?: string;
    
    // TODO: add pagination
}

export interface PostResponse extends Response {
    value?: ImagesRecord[];
}
