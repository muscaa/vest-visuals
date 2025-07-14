import {
    ImagesRecord,
    ImagesItem,
} from "@/types/db/images";

interface Props {
    params: Promise<{
        group: string;
    }>;
}

interface Request {
}

interface Response {
    success: boolean;
}

// GET

export interface GetProps extends Props {
}

export interface GetResponse extends Response {
    value?: ImagesRecord;
}

// POST

export interface PostProps extends Props {
}

export interface PostRequest extends Request {
    group?: string;
    type?: string;
    items?: ImagesItem[];
}

export interface PostResponse extends Response {
}

// PUT

export interface PutProps extends Props {
}

export interface PutRequest extends Request {
}

export interface PutResponse extends Response {
}
