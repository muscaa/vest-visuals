export interface GetProps {
    params: Promise<{
        category: string;
    }>;
}

export interface GetResponse {
    images: string[];
}
