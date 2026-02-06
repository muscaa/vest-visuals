"use client";

import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { splitRender } from "@client/snippets";

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
    onReset?: () => void;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
}

export function SimpleDialog<V>(props: Props<V>) {
    const [open, setOpen] = useState<boolean>(false);
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
            setOpen(false);
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

    const handleOpenChange = (open: boolean) => {
        setOpen(open);

        if (open) {
            setStatus(undefined);
            setErrorMessage(undefined);

            props.onReset?.();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger {...splitRender(props.trigger)} />
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        {props.children}
                    </div>
                </form>
                <DialogFooter>
                    <div className="flex flex-col size-full gap-2">
                        {
                            errorMessage && (
                                <p className="text-destructive">{errorMessage}</p>
                            )
                        }
                        <div className="flex gap-2">
                            <DialogClose render={
                                <Button
                                    variant="outline"
                                    className="grow"
                                >
                                    Cancel
                                </Button>
                            } />
                            <Button
                                type="submit"
                                variant={props.destructive ? "destructive" : "default"}
                                disabled={status == "sending" || status == "success" || props.submitDisabled}
                                onClick={handleSubmit}
                                className="grow"
                            >
                                {props.submitText[status || "default"] || props.submitText.default}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
