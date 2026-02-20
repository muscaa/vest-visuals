"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";

interface Props {
    albumId: string;
    parentPath?: string[];
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function AlbumsContentsCreateDialog(props: Props) {
    const [type, setType] = useState<"media" | "directory">("media");
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [directoryName, setDirectoryName] = useState<string>("");
    const [directoryCover, setDirectoryCover] = useState<string>();
    const { createAlbumsContentMedia, mediaUploadProgress, createAlbumsContentDirectory } = useAlbumsContents();

    const submit = async () => {
        if (type === "media") {
            return await createAlbumsContentMedia.mutateAsync(Array.from(mediaFiles).map((mediaFile) => ({
                content: {
                    albumId: props.albumId,
                    path: [...(props.parentPath ?? []), mediaFile.name],
                    order: 0,
                },
                mediaFile,
                mediaConfig: {
                    processor: {
                        id: "image-sharp-v1",
                        variants: {
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
                            original: {
                                order: 400,
                            },
                        },
                    },
                },
            })));
        } else if (type === "directory") {
            return await createAlbumsContentDirectory.mutateAsync({
                content: {
                    albumId: props.albumId,
                    path: [...(props.parentPath ?? []), directoryName],
                    order: 0,
                },
                directory: {
                    name: directoryName,
                    cover: directoryCover,
                },
            });
        }

        return undefined;
    };

    const handleReset = () => {
        setType("media");
        setDirectoryName("");
        setDirectoryCover(undefined);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="New Album Content"
            description="Create a new album content."
            submitText={{
                default: "Create",
                sending: "Creating...",
            }}
            submitDisabled={type === "media" && mediaFiles.length === 0 || type === "directory" && !directoryName}
            onSuccess={props.onCreate}
            onReset={handleReset}
            trigger={props.children}
        >
            <FieldGroup>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor="type">Type</FieldLabel>
                    <ToggleGroup id="type" variant="outline" value={[type]} onValueChange={(value) => value[0] && setType(value[0])}>
                        <ToggleGroupItem value="media" aria-label="Toggle media">
                            Media
                        </ToggleGroupItem>
                        <ToggleGroupItem value="directory" aria-label="Toggle directory">
                            Directory
                        </ToggleGroupItem>
                    </ToggleGroup>
                </Field>
                {
                    type === "media" && (
                        <>
                            <Field>
                                <FieldLabel htmlFor="files">Files</FieldLabel>
                                <Input
                                    id="files"
                                    type="file"
                                    placeholder="files"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setMediaFiles((e.target.files || []) as File[])}
                                />
                            </Field>
                            {
                                mediaUploadProgress && (
                                    <Progress
                                        value={mediaUploadProgress.at * 100 / mediaUploadProgress.max}
                                        max={100}
                                    />
                                )
                            }
                        </>
                    ) || type === "directory" && (
                        <>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="name"
                                    onChange={(e) => setDirectoryName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="cover">Cover</FieldLabel>
                                <Input
                                    id="cover"
                                    type="text"
                                    placeholder="cover"
                                    onChange={(e) => setDirectoryCover(e.target.value)}
                                />
                            </Field>
                        </>
                    )
                }
            </FieldGroup>
        </SimpleDialog>
    );
}
