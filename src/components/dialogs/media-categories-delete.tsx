"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { Value } from "@/types/api/media/categories";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: Value;
}

function ValidDialog(props: ValidProps) {
    const { removeMediaCategory } = useMediaCategories();

    const submit = async () => {
        return await removeMediaCategory.mutateAsync({
            id: props.value.id,
        });
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Media Category"
            description={
                <>
                    Are you sure you want to delete the media category <strong>&quot;{props.value.category}&quot;</strong>?
                </>
            }
            submitText={{
                default: "Delete",
                sending: "Deleting...",
            }}
            destructive={true}
            onSuccess={props.onDelete}
            trigger={props.children}
        />
    );
}

interface Props extends CommonProps {
    value?: Value;
}

export function MediaCategoriesDeleteDialog(props: Props) {
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
