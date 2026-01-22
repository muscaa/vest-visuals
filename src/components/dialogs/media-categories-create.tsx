"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaCategories } from "@/hooks/useMediaCategories";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
}

export function MediaCategoriesCreateDialog(props: Props) {
    const [category, setCategory] = useState<string>("");
    const { createMediaCategory } = useMediaCategories();

    const submit = async () => {
        return await createMediaCategory.mutateAsync({
            tag: category,
        });
    };

    const handleReset = () => {
        setCategory("");
    };

    return (
        <SimpleDialog
            submit={submit}
            title="New Media Category"
            description="Create a new media category."
            submitText={{
                default: "Create",
                sending: "Creating...",
            }}
            submitDisabled={!category}
            onSuccess={props.onCreate}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    type="text"
                    placeholder="category"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}
