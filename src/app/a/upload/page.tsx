"use client";

import { MainAdmin } from "@/components/admin/main";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as types from "@/types/api/images/upload";
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
            const filedata: types.FileData = {
                //alt: file.name,
                sizes: {
                    //original: {},
                    large: {
                        quality: 90,
                    },
                    medium: {
                        percent: 50,
                        quality: 80,
                    },
                    small: {
                        percent: 25,
                        quality: 70,
                    },
                },
            };

            formData.append("files", file);
            formData.append("filedatas", JSON.stringify(filedata));
        }

        const json: types.PostRequest = {
            group: "abcdefgh", // TODO get group from input
        };
        formData.append("json", JSON.stringify(json));

        try {
            const { data } = await api_client.postForm<types.PostResponse>("/images/upload", formData);

            setMessage(JSON.stringify(data));
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
