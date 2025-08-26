"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { MediaGroup } from "@shared/types/api/media/groups";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useMediaContents } from "@/hooks/useMediaContents";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: MediaGroup;
}

function ValidDialog(props: ValidProps) {
    const [all, setAll] = useState(false);
    const { removeMediaGroups } = useMediaGroups();
    const { removeMediaContents } = useMediaContents();

    const submit = async () => {
        if (all && props.value.mediaContents.length > 0) {
            await removeMediaContents.mutateAsync({
                ids: props.value.mediaContents,
            });
        }

        return await removeMediaGroups.mutateAsync({
            ids: [props.value.id],
        });
    };

    const handleReset = () => {
        setAll(false);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Media Group"
            description={
                <>
                    Are you sure you want to delete media group <strong>&quot;{props.value.id}&quot;</strong>?
                </>
            }
            submitText={{
                default: "Delete",
                sending: "Deleting...",
            }}
            destructive={true}
            onSuccess={props.onDelete}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex items-center gap-2">
                <Checkbox
                    id="all"
                    checked={all}
                    onCheckedChange={(state) => setAll(state != false)}
                />
                <Label htmlFor="all">Remove Contents</Label>
            </div>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: MediaGroup;
}

export function MediaGroupsDeleteDialog(props: Props) {
    if (!props.value) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            value={props.value}
            onDelete={props.onDelete}
        >
            {props.children}
        </ValidDialog>
    );
}
