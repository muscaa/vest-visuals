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
import * as types from "@/types/api/media/groups/update";
import { MediaGroupsRecord } from "@/types/db/mediaGroups";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    record: MediaGroupsRecord;
}

function ValidMediaGroupsEditDialog(props: ValidProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"editing" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [category, setCategory] = useState<string>(props.record.category || "");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("editing");
        setErrorMessage(undefined);

        const response = await api_client.post<types.PostResponse, types.PostRequest>("/media/groups/update", {
            id: props.record.id,
            category,
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
            setCategory(props.record.category || "");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Media Group</DialogTitle>
                    <DialogDescription>
                        Edit a media group.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                type="text"
                                placeholder="category"
                                defaultValue={props.record.category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
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
                                disabled={status == "editing" || status == "success"}
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

interface Props extends CommonProps {
    record?: MediaGroupsRecord;
}

export function MediaGroupsEditDialog(props: Props) {
    if (!props.record) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidMediaGroupsEditDialog
            record={props.record}
            onEdit={props.onEdit}
        >
            {props.children}
        </ValidMediaGroupsEditDialog>
    );
}
