"use client";

import { MainAdmin } from "@/components/admin/main";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as types from "@/types/api/media/upload";
import { api_client } from "@/utils/client/axios";

export default function Page() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const uploadFiles = async () => {
        setUploading(true);
        setMessage(null);

        const formData = new FormData();

        for (const file of files) {
            const json: types.FormDataJson = {
                processorConfig: {
                    id: "image-sharp-v1",
                    //alt: file.name,
                    variants: { // order kinda matters
                        small: {
                            qualityPercent: 70,
                            size: {
                                scaleUnit: 360,
                            },
                        },
                        medium: {
                            qualityPercent: 80,
                            size: {
                                scaleUnit: 768,
                            },
                        },
                        large: {
                            qualityPercent: 90,
                            size: {
                                scaleUnit: 1080,
                            },
                        },
                        //original: {},
                    },
                },
            };

            formData.append(types.formDataEntries.fileArray, file);
            formData.append(types.formDataEntries.jsonArray, JSON.stringify(json));
        }

        try {
            const { data } = await api_client.postForm<types.PostResponse>("/media/upload", formData);

            setMessage(JSON.stringify(data, null, 2));
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <MainAdmin>
            <div className="flex justify-center items-center size-full">
                <div className="flex flex-col max-w-md w-full gap-2 p-2">
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => setFiles((event.target.files || []) as File[])}
                    />
                    <Button
                        disabled={uploading || files.length === 0}
                        onClick={uploadFiles}
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                    <p>{message}</p>
                </div>
            </div>
        </MainAdmin>
    );
}
