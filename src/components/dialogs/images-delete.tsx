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
import { api_client } from "@/utils/client/axios";
import * as types from "@/types/api/images/delete";
import { ImagesRecord } from "@/types/db/images";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ImagesDeleteDialogValidProps extends CommonProps {
    record: ImagesRecord;
}

function ImagesDeleteDialogValid(props: ImagesDeleteDialogValidProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"deleting" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("deleting");
        setErrorMessage(undefined);

        const response = await api_client.post<types.PostResponse, types.PostRequest>("/images/delete", {
            group: props.record.group,
        });

        if (response.data.success) {
            setStatus("success");
            setOpen(false);

            props.onDelete?.();
        } else {
            setStatus("error");
            setErrorMessage(`An error occured: status code ${response.status}`);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setOpen(open);

        if (open) {
            setStatus(undefined);
            setErrorMessage(undefined);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Image Group</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the image group <strong>"{props.record.group}"</strong>?
                    </DialogDescription>
                </DialogHeader>
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
                                variant="destructive"
                                disabled={status == "deleting" || status == "success"}
                                onClick={handleSubmit}
                                className="grow"
                            >
                                {status == "deleting" ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface ImagesDeleteDialogProps extends CommonProps {
    record?: ImagesRecord;
}

export function ImagesDeleteDialog(props: ImagesDeleteDialogProps) {
    if (!props.record) return (
        <>
            {props.children}
        </>
    );

    return (
        <ImagesDeleteDialogValid
            record={props.record}
            onDelete={props.onDelete}
        >
            {props.children}
        </ImagesDeleteDialogValid>
    );
}
