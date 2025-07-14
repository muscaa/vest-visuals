import { RecordModel } from "pocketbase";

// DB

interface UsersBase {
    id: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    name: string;
    avatar: string;
}

export interface UsersRecord extends RecordModel, UsersBase {
    created: string;
    updated: string;
}

export interface UsersValue extends UsersBase {
    created: Date;
    updated: Date;
}

export function toUsersValue(record: UsersRecord): UsersValue {
    return {
        ...record,
        created: new Date(record.created),
        updated: new Date(record.updated),
    };
}
