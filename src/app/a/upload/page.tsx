"use client";

import { Main } from "@/components/main";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagesItem } from "@/types/db/images";

/*
const files = e.target.files;
if (files) {
    const formData = new FormData();
    for (const file of files) {
        formData.append("files", file);
    }
    await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
}
*/

export default function Page() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const uploadFiles = async () => {
        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        const json: ImagesItem[] = [];
        for (const file of files) {
            formData.append("files", file);

            json.push({
                src: file.name,
                alt: file.name,
                sizes: {
                    original: {
                        w: 0,
                        h: 0,
                    },
                },
            });
        }
        formData.append("data", JSON.stringify(json));

        try {
            const response = await fetch("/api/images/eph6m9", {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();
            setMessage(JSON.stringify(data));
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Main>
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
        </Main>
    );
}
