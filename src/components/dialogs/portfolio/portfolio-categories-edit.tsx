"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartialPortfolioCategory } from "@type/portfolio/categories";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialPortfolioCategory;
}

function ValidDialog(props: ValidProps) {
    const [tag, setTag] = useState<string>(props.value.tag);
    const { updatePortfolioCategory } = usePortfolioCategories();

    const submit = async () => {
        return updatePortfolioCategory.mutateAsync({
            id: props.value.id,
            value: {
                tag,
            },
        });
    };

    const handleReset = () => {
        setTag("");
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Edit Portfolio Category"
            description="Update a portfolio category."
            submitText={{
                default: "Update",
                sending: "Updating...",
            }}
            submitDisabled={!tag}
            onSuccess={props.onEdit}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="tag">Tag</Label>
                <Input
                    id="tag"
                    type="text"
                    placeholder="tag"
                    defaultValue={props.value.tag}
                    required
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: PartialPortfolioCategory;
}

export function PortfolioCategoriesEditDialog(props: Props) {
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
