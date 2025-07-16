"use client";

import { MainAdmin } from "@/components/admin/main";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as types from "@/types/api/images";
import { ImagesItem } from "@/types/db/images";
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

interface ImagesItemEntryProps {
    item: ImagesItem;
}

function ImagesItemEntry(props: ImagesItemEntryProps) {
    return (
        <div className="flex flex-col">
            <h4>{props.item.alt}</h4>
            <p>{props.item.src}</p>
        </div>
    );
}

export default function Page() {
    const [filter, setFilter] = useState<string>();
    const [sort, setSort] = useState<string>();

    const { data } = useQuery({
        queryKey: ["images", filter, sort],
        queryFn: async () => {
            const response = await fetch("/api/images", {
                method: "POST",
                body: JSON.stringify({
                    filter,
                    sort,
                } as types.PostRequest),
            });
            const json: types.PostResponse = await response.json();

            if (json.success) {
                return json.value
                    ?.map((record) => record.items)
                    .flatMap((items) => items.map((item) => ({
                        ...item,
                    }))) || [];
            }

            return [];
        },
    });

    return (
        <MainAdmin>
            <div className="flex justify-center items-center size-full">
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you&apos;re
                                    done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>

                {/*<div className="flex flex-col max-w-md w-full gap-2 p-2">
                    {
                        data && (
                            data.map((item, index) => (
                                <ImagesItemEntry
                                    key={index}
                                    item={item}
                                />
                            ))
                        )
                    }
                </div>*/}
            </div>
        </MainAdmin>
    );
}
