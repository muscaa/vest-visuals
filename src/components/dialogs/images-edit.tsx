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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api_client } from "@/utils/client/axios";
import * as types from "@/types/api/images/edit";
import { ImagesRecord } from "@/types/db/images";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ImagesEditDialogValidProps extends CommonProps {
    record: ImagesRecord;
}

function ImagesEditDialogValid(props: ImagesEditDialogValidProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"editing" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [group, setGroup] = useState<string>(props.record.group);
    const [type, setType] = useState<string>(props.record.type);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("editing");
        setErrorMessage(undefined);

        const response = await api_client.post<types.PostResponse, types.PostRequest>("/images/edit", {
            group: props.record.group,
            newGroup: group,
            newType: type,
        });

        if (response.data.success) {
            setStatus("success");
            setOpen(false);

            props.onEdit?.();
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
            setGroup(props.record.group);
            setType(props.record.type);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Image Group</DialogTitle>
                    <DialogDescription>
                        Edit an image group.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="group">Group</Label>
                            <Input
                                id="group"
                                type="text"
                                placeholder="group"
                                defaultValue={props.record.group}
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="type">Type</Label>
                            <Input
                                id="type"
                                type="text"
                                placeholder="type"
                                defaultValue={props.record.type}
                                required
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
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
                                disabled={status == "editing" || status == "success" || type.length == 0}
                                onClick={handleSubmit}
                                className="grow"
                            >
                                {status == "editing" ? "Editing..." : "Edit"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface ImagesEditDialogProps extends CommonProps {
    record?: ImagesRecord;
}

export function ImagesEditDialog(props: ImagesEditDialogProps) {
    if (!props.record) return (
        <>
            {props.children}
        </>
    );

    return (
        <ImagesEditDialogValid
            record={props.record}
            onEdit={props.onEdit}
        >
            {props.children}
        </ImagesEditDialogValid>
    );
}
