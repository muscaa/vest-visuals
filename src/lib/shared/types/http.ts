export type Response<T> = {
    success: false;
    message: string;
} | ({
    success: true;
} & T);
