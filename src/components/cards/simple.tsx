"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props<V> {
    submit: (event: React.FormEvent) => Promise<V>;
    title?: string;
    description?: React.ReactNode;
    submitText: {
        default: string;
        sending?: string;
        success?: string;
        error?: string;
    };
    submitDisabled?: boolean;
    destructive?: boolean;
    onSuccess?: (result: V) => void;
    onError?: () => void;
    children?: React.ReactNode;
    footer?: React.ReactNode;
}

export function SimpleCard<V>(props: Props<V>) {
    const [status, setStatus] = useState<"sending" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("sending");
        setErrorMessage(undefined);

        try {
            const result = await props.submit(event);

            props.onSuccess?.(result);

            setStatus("success");
        } catch (error) {
            props.onError?.();

            setStatus("error");

            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    };

    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        {props.children}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col size-full gap-2">
                    {
                        errorMessage && (
                            <p className="text-destructive text-center">{errorMessage}</p>
                        )
                    }
                    <Button
                        type="submit"
                        variant={props.destructive ? "destructive" : "default"}
                        disabled={status == "sending" || status == "success" || props.submitDisabled}
                        onClick={handleSubmit}
                        className="grow"
                    >
                        {props.submitText[status || "default"] || props.submitText.default}
                    </Button>
                    {props.footer}
                </div>
            </CardFooter>
        </Card>
    );
}
