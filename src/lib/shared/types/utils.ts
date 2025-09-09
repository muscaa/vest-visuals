export type SelectRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type ListProps<T, Append = T, Remove = T> = {
    set?: T[];
    append?: Append[];
    remove?: Remove[];
};
