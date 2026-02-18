"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { PartialAlbum } from "@type/albums/albums";
import { useAlbums } from "@/hooks/albums/useAlbums";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialAlbum;
}

function ValidDialog(props: ValidProps) {
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [cover, setCover] = useState<string>();
    const { updateAlbum } = useAlbums();

    const submit = async () => {
        return updateAlbum.mutateAsync({
            id: props.value.id,
            value: {
                title,
                description,
                cover,
            },
        });
    };

    const handleReset = () => {
        setTitle(undefined);
        setDescription(undefined);
        setCover(undefined);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Edit Album"
            description="Update an album."
            submitText={{
                default: "Update",
                sending: "Updating...",
            }}
            // submitDisabled={!tag}
            onSuccess={props.onEdit}
            onReset={handleReset}
            trigger={props.children}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                        id="title"
                        type="text"
                        placeholder="title"
                        defaultValue={props.value.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Input
                        id="description"
                        type="text"
                        placeholder="description"
                        defaultValue={props.value.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="cover">Cover</FieldLabel>
                    <Input
                        id="cover"
                        type="text"
                        placeholder="cover"
                        defaultValue={props.value.cover}
                        onChange={(e) => setCover(e.target.value)}
                    />
                </Field>
            </FieldGroup>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: PartialAlbum;
}

export function AlbumsEditDialog(props: Props) {
    if (!props.value) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            value={props.value}
            onEdit={props.onEdit}
        >
            {props.children}
        </ValidDialog>
    );
}
