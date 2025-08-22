export type ProcessorConfig = {};

export interface Size {
    width: number;
    height: number;
}

export interface VariantMap<T> {
    [key: string]: T | undefined;

    original?: T;
    large?: T;
    medium?: T;
    small?: T;
}
