export type AlbumsDirectory = {
    contentId: string;
    name: string;
    cover?: string;
    createdAt: Date;
    updatedAt: Date;
};
export type CreateProps = {
    contentId: string;
    name: string;
    cover?: string;
};
export type UpdateProps = {
    name?: string;
    cover?: string;
};
