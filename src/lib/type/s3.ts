export type MultipartUpload = {
    uploadId: string;
    presignedUrls: string[];
};

export type MultipartUploadPart = {
    ETag: string;
    PartNumber: number;
};
