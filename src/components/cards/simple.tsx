"use client";

import { useState } from "react";
import { cn } from "@shared/shadcn/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CardFooterDefault,
    CardFooterProps,
} from "./footers";

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
    footer?: (props: CardFooterProps) => React.ReactNode;
    className?: string;
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

    const Footer = props.footer ?? CardFooterDefault;

    return (
        <Card className={cn("w-full", props.className)}>
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
                <Footer
                    button={(
                        <Button
                            type="submit"
                            variant={props.destructive ? "destructive" : "default"}
                            disabled={status == "sending" || status == "success" || props.submitDisabled}
                            onClick={handleSubmit}
                            className="grow"
                        >
                            {props.submitText[status || "default"] || props.submitText.default}
                        </Button>
                    )}
                    error={(
                        errorMessage && (
                            <p className="text-destructive text-center">{errorMessage}</p>
                        )
                    )}
                />
            </CardFooter>
        </Card>
    );
}
