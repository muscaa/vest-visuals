export type SelectRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type ListProps<T> = {
    set?: T[];
    append?: T[];
    remove?: T[];
};
