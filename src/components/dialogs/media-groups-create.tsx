"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { FullMediaCategory } from "@shared/types/api/media/categories";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
    parent?: FullMediaCategory;
}

export function MediaGroupsCreateDialog(props: Props) {
    const [top, setTop] = useState(true);
    const { createMediaGroup, removeMediaGroups } = useMediaGroups();
    const { updateMediaCategory } = useMediaCategories();

    const submit = async () => {
        const result = await createMediaGroup.mutateAsync({});

        if (props.parent) {
            try {
                await updateMediaCategory.mutateAsync({
                    id: props.parent.id,
                    mediaGroups: {
                        set: top ? [result.id, ...props.parent.mediaGroups.map((group) => group.id)] : undefined,
                        append: top ? undefined : [result.id],
                    },
                });
            } catch (error) {
                await removeMediaGroups.mutateAsync({
                    ids: [result.id],
                });

                throw error;
            }
        }

        return result;
    };

    const handleReset = () => {
        setTop(true);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="New Media Group"
            description="Create a new media group."
            submitText={{
                default: "Create",
                sending: "Creating...",
            }}
            onSuccess={props.onCreate}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex items-center gap-2">
                <Checkbox
                    id="top"
                    checked={top}
                    onCheckedChange={(state) => setTop(state != false)}
                />
                <Label htmlFor="top">Append at Top</Label>
            </div>
        </SimpleDialog>
    );
}
