import {
    ImagesRecord,
} from "@/types/db/images";

interface Request {
}

interface Response {
    success: boolean;
}

// GET

export interface GetRequest extends Request {
    filter?: string;
    sort?: string;
    
    // TODO: add pagination
}

export interface GetResponse extends Response {
    value?: ImagesRecord[];
}
