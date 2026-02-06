"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { PartialPortfolioGroup } from "@type/portfolio/groups";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";
import { usePortfolioMedia } from "@/hooks/portfolio/usePortfolioMedia";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialPortfolioGroup;
}

function ValidDialog(props: ValidProps) {
    const [all, setAll] = useState(false);
    const { removePortfolioGroups } = usePortfolioGroups();
    const { removePortfolioMedia } = usePortfolioMedia();

    const submit = async () => {
        if (all && props.value.portfolioMediaIds.length > 0) {
            await removePortfolioMedia.mutateAsync(props.value.portfolioMediaIds);
        }

        return await removePortfolioGroups.mutateAsync([props.value.id]);
    };

    const handleReset = () => {
        setAll(false);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Portfolio Group"
            description={
                <>
                    Are you sure you want to delete portfolio group <strong>&quot;{props.value.id}&quot;</strong>?
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
                <Label htmlFor="all">Remove Media</Label>
            </div>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: PartialPortfolioGroup;
}

export function PortfolioGroupsDeleteDialog(props: Props) {
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
