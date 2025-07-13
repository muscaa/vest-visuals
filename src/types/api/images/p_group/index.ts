interface Props {
    params: Promise<{
        group: string;
    }>;
}

interface Request {
}

interface Response {
    success: boolean;
    record?: any;
}

// GET

export interface GetProps extends Props {
}

export interface GetRequest extends Request {
}

export interface GetResponse extends Response {
}

// POST

export interface PostProps extends Props {
}

export interface PostRequest extends Request {
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
