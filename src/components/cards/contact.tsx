"use client";

import { SimpleCard } from "./simple";
import { useContact } from "@/hooks/useContact";
import { useState } from "react";
import { Input } from "../ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "../ui/input-group";
import { CardFooterReCaptchaHorizontal } from "./footers";

interface Props {
    onContact?: () => void;
}

export function ContactCard(props: Props) {
    const { contact } = useContact();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const submit = async () => {
        await contact.mutateAsync({
            name,
            email,
            message,
        });
    };

    return (
        <SimpleCard
            submit={submit}
            title="Mesaj Rapid"
            description="Completeaza formularul de mai jos si vom raspunde cat de repede putem."
            submitText={{
                default: "Trimite",
                sending: "Se trimite...",
                success: "Trimis!",
            }}
            submitDisabled={name.length == 0 || email.length == 0 || message.length == 0}
            onSuccess={props.onContact}
            footer={CardFooterReCaptchaHorizontal}
            className="w-xs lg:w-md"
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Nume</FieldLabel>
                    <Input
                        id="name"
                        placeholder="Numele Tau"
                        maxLength={50}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                        id="email"
                        placeholder="nume@gmail.com"
                        maxLength={100}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="message">Mesaj</FieldLabel>
                    <InputGroup>
                        <InputGroupTextarea
                            id="message"
                            placeholder="..."
                            className="h-36"
                            maxLength={1000}
                            required
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                                {message.length}/1000
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            </FieldGroup>
        </SimpleCard>
    );
}
