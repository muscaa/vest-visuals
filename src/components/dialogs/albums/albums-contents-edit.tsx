"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { PartialAlbumsContent } from "@type/albums/contents";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

interface CommonProps {
    albumId: string;
    parentPath?: string[];
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialAlbumsContent;
}

function ValidDialog(props: ValidProps) {
    const [directoryName, setDirectoryName] = useState<string>();
    const [directoryCover, setDirectoryCover] = useState<string>();
    const { updateAlbumsContent } = useAlbumsContents();

    const submit = async () => {
        return updateAlbumsContent.mutateAsync({
            id: props.value.id,
            value: {
                path: directoryName ? [...(props.parentPath ?? []), directoryName] : undefined,
                type: "directory",
                albumsDirectory: {
                    name: directoryName,
                    cover: directoryCover,
                },
            },
        });
    };

    const handleReset = () => {
        setDirectoryName(undefined);
        setDirectoryCover(undefined);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Edit Album Content"
            description="Update an album content."
            submitText={{
                default: "Update",
                sending: "Updating...",
            }}
            submitDisabled={!directoryName}
            onSuccess={props.onEdit}
            onReset={handleReset}
            trigger={props.children}
        >
            <FieldGroup>
                {
                    props.value.type === "media" && (
                        <>
                        </>
                    ) || props.value.type === "directory" && (
                        <>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="name"
                                    defaultValue={props.value.albumsDirectory?.name}
                                    onChange={(e) => setDirectoryName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="cover">Cover</FieldLabel>
                                <Input
                                    id="cover"
                                    type="text"
                                    placeholder="cover"
                                    defaultValue={props.value.albumsDirectory?.cover}
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

interface Props extends CommonProps {
    value?: PartialAlbumsContent;
}

export function AlbumsContentsEditDialog(props: Props) {
    if (!props.value) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            albumId={props.albumId}
            parentPath={props.parentPath}
            value={props.value}
            onEdit={props.onEdit}
        >
            {props.children}
        </ValidDialog>
    );
}
