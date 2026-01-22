"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { PortfolioCategory } from "@type/portfolio/categories";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
    parent?: PortfolioCategory;
}

export function MediaGroupsCreateDialog(props: Props) {
    const [description, setDescription] = useState<string>("");
    const [top, setTop] = useState(true);
    const { createMediaGroup, removeMediaGroups } = useMediaGroups();
    const { updateMediaCategory } = useMediaCategories();

    const submit = async () => {
        const result = await createMediaGroup.mutateAsync({
            description,
        });

        if (props.parent) {
            try {
                await updateMediaCategory.mutateAsync({
                    id: props.parent.id,
                    value: {
                        portfolioGroups: {
                            set: top ? [result.id, ...props.parent.portfolioGroups.map((group) => group.id)] : undefined,
                            append: top ? undefined : [result.id],
                        },
                    },
                });
            } catch (error) {
                await removeMediaGroups.mutateAsync([result.id]);

                throw error;
            }
        }

        return result;
    };

    const handleReset = () => {
        setDescription("");
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
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            {
                props.parent && (
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="top"
                            checked={top}
                            onCheckedChange={(state) => setTop(state != false)}
                        />
                        <Label htmlFor="top">Append at Top</Label>
                    </div>
                )
            }
        </SimpleDialog>
    );
}
