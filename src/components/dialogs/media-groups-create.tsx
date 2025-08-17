"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { FullMediaCategory } from "@/types/api/media/categories";

interface Props {
    onCreate?: () => void;
    children?: React.ReactNode;
    parent?: FullMediaCategory;
}

export function MediaGroupsCreateDialog(props: Props) {
    const { createMediaGroup, removeMediaGroup } = useMediaGroups();
    const { updateMediaCategory } = useMediaCategories();

    const submit = async () => {
        const result = await createMediaGroup.mutateAsync({});

        if (props.parent) {
            try {
                await updateMediaCategory.mutateAsync({
                    id: props.parent.id,
                    mediaGroups: {
                        append: [result.id],
                    },
                });
            } catch (error) {
                await removeMediaGroup.mutateAsync({
                    id: result.id,
                });

                throw error;
            }
        }

        return result;
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
            trigger={props.children}
        />
    );
}
