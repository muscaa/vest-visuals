"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useAssetsMedia } from "@/hooks/assets/useAssetsMedia";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function AssetsMediaUploadDialog(props: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const { uploadAssetsMedia, uploadProgress } = useAssetsMedia();

    const submit = async () => {
        const result = await uploadAssetsMedia.mutateAsync({
            files,
            configs: Array.from(files).map(() => ({
                processor: {
                    id: "image-sharp-v1",
                    //alt: file.name,
                    variants: { // order kinda matters
                        small: {
                            order: 100,
                            qualityPercent: 70,
                            size: {
                                scaleUnit: 360,
                            },
                        },
                        medium: {
                            order: 200,
                            qualityPercent: 80,
                            size: {
                                scaleUnit: 768,
                            },
                        },
                        large: {
                            order: 300,
                            qualityPercent: 90,
                            size: {
                                scaleUnit: 1080,
                            },
                        },
                        //original: {},
                    },
                }
            })),
        });

        return result;
    };

    const handleReset = () => {
        setFiles([]);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Upload Assets Media"
            description="Upload new assets media."
            submitText={{
                default: "Upload",
                sending: "Uploading...",
            }}
            submitDisabled={files.length == 0}
            onSuccess={props.onCreate}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
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
            {
                uploadProgress && (
                    <Progress
                        value={uploadProgress.at * 100 / uploadProgress.max}
                        max={100}
                    />
                )
            }
        </SimpleDialog>
    );
}
