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
import * as types from "@/types/api/media/groups/create";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function MediaGroupsCreateDialog(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"creating" | "success" | "error">();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [id, setId] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatus("creating");
        setErrorMessage(undefined);

        const response = await api_client.post<types.PostResponse, types.PostRequest>("/media/groups/create", {
            id,
            category,
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
            setId("");
            setCategory("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Media Group</DialogTitle>
                    <DialogDescription>
                        Create a new media group.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="id">ID</Label>
                            <Input
                                id="id"
                                type="text"
                                placeholder="id"
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                type="text"
                                placeholder="category"
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
                                disabled={status == "creating" || status == "success"}
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
