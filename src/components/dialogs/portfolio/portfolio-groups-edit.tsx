"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartialPortfolioGroup } from "@type/portfolio/groups";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialPortfolioGroup;
}

function ValidDialog(props: ValidProps) {
    const [location, setLocation] = useState<string>(props.value.location || "");
    const [description, setDescription] = useState<string>(props.value.description || "");
    const { updatePortfolioGroup } = usePortfolioGroups();

    const submit = async () => {
        return updatePortfolioGroup.mutateAsync({
            id: props.value.id,
            value: {
                location: location || null,
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
            title="Edit Portfolio Group"
            description="Update a portfolio group."
            submitText={{
                default: "Update",
                sending: "Updating...",
            }}
            onSuccess={props.onEdit}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="location">Location (optional)</Label>
                <Input
                    id="location"
                    type="text"
                    placeholder="location"
                    defaultValue={props.value.location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="description"
                    defaultValue={props.value.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: PartialPortfolioGroup;
}

export function PortfolioGroupsEditDialog(props: Props) {
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
