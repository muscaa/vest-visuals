"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { MediaCategory } from "@/types/api/media/categories";

interface CommonProps {
    onEdit?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: MediaCategory;
}

function ValidDialog(props: ValidProps) {
    const [category, setCategory] = useState<string>(props.value.category);
    const { updateMediaCategory } = useMediaCategories();

    const submit = async () => {
        return updateMediaCategory.mutateAsync({
            id: props.value.id,
            category,
        });
    };

    const handleReset = () => {
        setCategory("");
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Edit Media Category"
            description="Update a media category."
            submitText={{
                default: "Update",
                sending: "Updating...",
            }}
            submitDisabled={!category}
            onSuccess={props.onEdit}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    type="text"
                    placeholder="category"
                    defaultValue={props.value.category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: MediaCategory;
}

export function MediaCategoriesEditDialog(props: Props) {
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
