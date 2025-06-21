export interface PostRequest {
    token: string;
    name: string;
    email: string;
    message: string;
}

export interface PostResponse {
    success: boolean;
    message?: string;
}
