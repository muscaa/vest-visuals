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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function AlbumsCreateDialog(props: Props) {
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [cover, setCover] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [expires, setExpires] = useState<Date>();
    const { createAlbum } = useAlbums();

    const submit = async () => {
        if (!title || !expires) return undefined;

        const lockAt = expires;
        const deleteAt = new Date(expires);
        deleteAt.setDate(deleteAt.getDate() + 30);

        return await createAlbum.mutateAsync({
            title,
            description,
            cover,
            email,
            phoneNumber,
            lockAt,
            deleteAt,
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
            submitDisabled={!title || !expires}
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
                        required
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
                <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+40"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="expires">Expires</FieldLabel>
                    <Popover>
                        <PopoverTrigger render={
                            <Button id="expires" variant="outline" className="justify-start font-normal">
                                {
                                    expires && (
                                        format(expires, "PPP")
                                    ) || (
                                        <span>Pick a date</span>
                                    )
                                }
                            </Button>
                        } />
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={expires}
                                onSelect={setExpires}
                                defaultMonth={expires}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
            </FieldGroup>
        </SimpleDialog>
    );
}
