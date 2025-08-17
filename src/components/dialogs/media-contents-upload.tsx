"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { useMediaContents } from "@/hooks/useMediaContents";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { FullMediaGroup } from "@/types/api/media/groups";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
    parent?: FullMediaGroup;
}

export function MediaGroupsCreateDialog(props: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const { uploadMediaContents } = useMediaContents();
    const { updateMediaGroup } = useMediaGroups();

    const submit = async () => {
        const result = await uploadMediaContents.mutateAsync({
            files,
            configs: files.map(() => ({
                processor: {
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
                }
            })),
        });

        if (props.parent) {
            await updateMediaGroup.mutateAsync({
                id: props.parent.id,
                mediaContents: {
                    append: result.map((value) => value.id),
                },
            });
        }

        return result;
    };

    const handleReset = () => {
        setFiles([]);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="New Media Contents"
            description="Upload new media contents."
            submitText={{
                default: "Upload",
                sending: "Uploading...",
            }}
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
        </SimpleDialog>
    );
}
