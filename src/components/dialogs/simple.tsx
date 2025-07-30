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
import { AxiosResponse } from "axios";

interface Props {
    submit: (event: React.FormEvent) => Promise<AxiosResponse>;
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
    onSuccess?: () => void;
    onError?: () => void;
    onReset?: () => void;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
}

export function SimpleDialog(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"sending" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("sending");
        setErrorMessage(undefined);

        const response = await props.submit(event);

        if (response.status == 200) {
            props.onSuccess?.();

            setStatus("success");
            setOpen(false);
        } else {
            props.onError?.();

            setStatus("error");
            setErrorMessage(`An error occured: status code ${response.status}`);
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
            <DialogTrigger asChild>
                {props.trigger}
            </DialogTrigger>
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
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="grow"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
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
