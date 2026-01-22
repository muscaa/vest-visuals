"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { PartialPortfolioGroup } from "@type/portfolio/groups";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialPortfolioGroup;
}

function ValidDialog(props: ValidProps) {
    const [description, setDescription] = useState<string>(props.value.description || "");
    const { updateMediaGroup } = useMediaGroups();

    const submit = async () => {
        return updateMediaGroup.mutateAsync({
            id: props.value.id,
            value: {
                description: description || null,
            },
        });
    };

    const handleReset = () => {
        setDescription("");
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Edit Media Group"
            description="Update a media group."
            submitText={{
                default: "Update",
                sending: "Updating...",
            }}
            onSuccess={props.onEdit}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="description"
                    defaultValue={props.value.description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: PartialPortfolioGroup;
}

export function MediaGroupsEditDialog(props: Props) {
    if (!props.value) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            value={props.value}
            onEdit={props.onEdit}
        >
            {props.children}
        </ValidDialog>
    );
}
