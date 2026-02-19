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

interface Props {
    albumId: string;
    parentPath?: string[];
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function AlbumsContentsCreateDialog(props: Props) {
    const [type, setType] = useState<"media" | "directory">("media");
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [directoryName, setDirectoryName] = useState<string>();
    const [directoryCover, setDirectoryCover] = useState<string>();
    const { createAlbumsContent } = useAlbumsContents();

    const submit = async () => {
        return await createAlbumsContent.mutateAsync({
            albumId: props.albumId,
            path: [...(props.parentPath ?? []), directoryName!],
            order: 0,
            type: "directory",
            albumsDirectory: {
                name: directoryName!,
                cover: directoryCover,
            },
        });
    };

    const handleReset = () => {
        setType("media");
        setDirectoryName(undefined);
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
            submitDisabled={!directoryName}
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
