import { RecordModel } from "pocketbase";

export interface UsersRecord extends RecordModel {
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    name: string;
    avatar: string;
    created: string; // Date
    updated: string; // Date
}
