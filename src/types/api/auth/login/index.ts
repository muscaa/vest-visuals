export interface PostRequest {
    token: string;
    email: string;
    password: string;
}

export interface PostResponse {
    success: boolean;
    message?: string;
}
