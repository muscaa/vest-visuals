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
import * as types_update from "@/types/api/media/groups/update";
import * as types_remove from "@/types/api/media/variants/remove";
import { MediaGroupsRecord } from "@/types/db/mediaGroups";
import { MediaVariantsRecord } from "@/types/db/mediaVariants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    from: MediaGroupsRecord;
    record: MediaVariantsRecord;
}

function ValidDialog(props: ValidProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"deleting" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [permanent, setPermanent] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("deleting");
        setErrorMessage(undefined);

        const response = permanent ?
            await api_client.post<types_remove.PostResponse, types_remove.PostRequest>("/media/variants/remove", {
                id: props.record.id,
                removeMedia: true,
            })
            : await api_client.post<types_update.PostResponse, types_update.PostRequest>("/media/groups/update", {
                id: props.from.id,
                mediaVariants: {
                    remove: [props.record.id],
                }
            });

        if (response.data.success) {
            props.onDelete?.();

            setStatus("success");
            setOpen(false);
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
            setPermanent(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Media Variant</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the media
                        variant <strong>&quot;{props.record.id}&quot;</strong> from <strong>&quot;{props.from.id}&quot;</strong>?
                        <br />
                        <br />
                        *Deleting it permanently also removes it from the database, not just the group.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="permanent"
                                onCheckedChange={(value) => setPermanent(value == true)}
                            />
                            <Label htmlFor="permanent">Delete Permanently</Label>
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
                                variant={permanent ? "destructive" : "default"}
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

interface Props extends CommonProps {
    from?: MediaGroupsRecord;
    record?: MediaVariantsRecord;
}

export function MediaGroupsVariantDeleteDialog(props: Props) {
    if (!props.record || !props.from) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            from={props.from}
            record={props.record}
            onDelete={props.onDelete}
        >
            {props.children}
        </ValidDialog>
    );
}
