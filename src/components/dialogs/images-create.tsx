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
import * as types from "@/types/api/images/create";

interface ImagesCreateDialogProps {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function ImagesCreateDialog(props: ImagesCreateDialogProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"creating" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [group, setGroup] = useState<string>("");
    const [type, setType] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("creating");
        setErrorMessage(undefined);

        const response = await api_client.post<types.PostResponse, types.PostRequest>("/images/create", {
            group,
            type,
        });

        if (response.data.success) {
            setStatus("success");
            setOpen(false);

            props.onCreate?.();
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
            setGroup("");
            setType("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Image Group</DialogTitle>
                    <DialogDescription>
                        Create a new image group.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="group">Group (optional)</Label>
                            <Input
                                id="group"
                                type="text"
                                placeholder="group"
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="type">Type</Label>
                            <Input
                                id="type"
                                type="text"
                                placeholder="type"
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
                                disabled={status == "creating" || status == "success" || type.length == 0}
                                onClick={handleSubmit}
                                className="grow"
                            >
                                {status == "creating" ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
