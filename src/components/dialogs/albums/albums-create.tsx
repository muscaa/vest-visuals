"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { useAlbums } from "@/hooks/albums/useAlbums";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function AlbumsCreateDialog(props: Props) {
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [cover, setCover] = useState<string>();
    const { createAlbum } = useAlbums();

    const submit = async () => {
        return await createAlbum.mutateAsync({
            title,
            description,
            cover,
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
            title="New Album"
            description="Create a new album."
            submitText={{
                default: "Create",
                sending: "Creating...",
            }}
            // submitDisabled={!tag}
            onSuccess={props.onCreate}
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
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Input
                        id="description"
                        type="text"
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="cover">Cover</FieldLabel>
                    <Input
                        id="cover"
                        type="text"
                        placeholder="cover"
                        onChange={(e) => setCover(e.target.value)}
                    />
                </Field>
            </FieldGroup>
        </SimpleDialog>
    );
}
