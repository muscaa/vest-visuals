"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function PortfolioCategoriesCreateDialog(props: Props) {
    const [tag, setTag] = useState<string>("");
    const { createPortfolioCategory } = usePortfolioCategories();

    const submit = async () => {
        return await createPortfolioCategory.mutateAsync({
            tag,
        });
    };

    const handleReset = () => {
        setTag("");
    };

    return (
        <SimpleDialog
            submit={submit}
            title="New Portfolio Category"
            description="Create a new portfolio category."
            submitText={{
                default: "Create",
                sending: "Creating...",
            }}
            submitDisabled={!tag}
            onSuccess={props.onCreate}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="tag">Tag</Label>
                <Input
                    id="tag"
                    type="text"
                    placeholder="tag"
                    required
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}
