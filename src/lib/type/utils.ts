export type SelectRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type Replace<T, R> = Omit<T, keyof R> & R;

export type ListProps<T, Append = T, Remove = T> = {
    set?: T[];
    append?: Append[];
    remove?: Remove[];
};

export type Single<T> = {
    [K in keyof T]: {
        [P in K]: T[P]
    } & {
        [P in Exclude<keyof T, K>]?: never
    }
}[keyof T];
