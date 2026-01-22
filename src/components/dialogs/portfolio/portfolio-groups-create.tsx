"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { PortfolioCategory } from "@type/portfolio/categories";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
    parent?: PortfolioCategory;
}

export function PortfolioGroupsCreateDialog(props: Props) {
    const [description, setDescription] = useState<string>("");
    const [top, setTop] = useState(true);
    const { updatePortfolioCategory } = usePortfolioCategories();
    const { createPortfolioGroup, removePortfolioGroups } = usePortfolioGroups();

    const submit = async () => {
        const result = await createPortfolioGroup.mutateAsync({
            description,
        });

        if (props.parent) {
            try {
                await updatePortfolioCategory.mutateAsync({
                    id: props.parent.id,
                    value: {
                        portfolioGroups: {
                            set: top ? [result.id, ...props.parent.portfolioGroups.map((group) => group.id)] : undefined,
                            append: top ? undefined : [result.id],
                        },
                    },
                });
            } catch (error) {
                await removePortfolioGroups.mutateAsync([result.id]);

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
            title="New Portfolio Group"
            description="Create a new portfolio group."
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
