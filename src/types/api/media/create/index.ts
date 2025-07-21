import {
    MediaRecord,
    ImageMediaInfo,
    VideoMediaInfo,
} from "@/types/db/media";

// POST

export type PostRequest = {
    id?: string;
    variant?: string;
    file: File | Blob;
} & ({
    type: "image";
    info?: ImageMediaInfo;
} | {
    type: "video";
    info?: VideoMediaInfo;
});

export interface PostResponse {
    success: boolean;
    value?: MediaRecord;
}
