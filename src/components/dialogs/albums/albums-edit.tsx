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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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
    const [email, setEmail] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [expires, setExpires] = useState<Date>();
    const { updateAlbum } = useAlbums();

    const submit = async () => {
        const lockAt = expires;
        const deleteAt = expires ? new Date(expires) : undefined;
        deleteAt?.setDate(deleteAt.getDate() + 30);

        return updateAlbum.mutateAsync({
            id: props.value.id,
            value: {
                title,
                description,
                cover,
                email,
                phoneNumber,
                lockAt,
                deleteAt,
            },
        });
    };

    const handleReset = () => {
        setTitle(undefined);
        setDescription(undefined);
        setCover(undefined);
        setEmail(undefined);
        setPhoneNumber(undefined);
        setExpires(undefined);
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
                <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email"
                        defaultValue={props.value.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+40"
                        defaultValue={props.value.phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="expires">Expires</FieldLabel>
                    <Popover>
                        <PopoverTrigger render={
                            <Button id="expires" variant="outline" className="justify-start font-normal">
                                {
                                    format(expires ?? props.value.lockAt, "PPP")
                                }
                            </Button>
                        } />
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={expires ?? props.value.lockAt}
                                onSelect={setExpires}
                                defaultMonth={expires ?? props.value.lockAt}
                            />
                        </PopoverContent>
                    </Popover>
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
