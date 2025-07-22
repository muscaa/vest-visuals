"use client";

import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api_client } from "@/utils/client/axios";
import * as types from "@/types/api/media/upload";

interface Props {
    onUpload?: (data: types.PostResponse) => void;
    children?: React.ReactNode;
}

export function MediaGroupsCreateDialog(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"uploading" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("uploading");
        setErrorMessage(undefined);

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

        const response = await api_client.postForm<types.PostResponse>("/media/upload", formData);

        if (response.data.success) {
            props.onUpload?.(response.data);

            setStatus("success");
            setOpen(false);
        } else {
            setStatus("error");
            setErrorMessage(`An error occured: status code ${response.status}`);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setOpen(open);

        if (open) {
            setStatus(undefined);
            setErrorMessage(undefined);
            setFiles([]);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                    <DialogDescription>
                        Upload multiple media files at once.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="files">Files</Label>
                            <Input
                                id="files"
                                type="file"
                                placeholder="files"
                                accept="image/*"
                                multiple
                                onChange={(e) => setFiles((e.target.files || []) as File[])}
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <div className="flex flex-col size-full gap-2">
                        {
                            errorMessage && (
                                <p className="text-destructive">{errorMessage}</p>
                            )
                        }
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="grow"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={status == "uploading" || status == "success"}
                                onClick={handleSubmit}
                                className="grow"
                            >
                                {status == "uploading" ? "Uploading..." : "Upload"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
