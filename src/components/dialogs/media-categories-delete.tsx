"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { PartialMediaCategory } from "@type/media/categories";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialMediaCategory;
}

function ValidDialog(props: ValidProps) {
    const { removeMediaCategories } = useMediaCategories();

    const submit = async () => {
        return await removeMediaCategories.mutateAsync({
            ids: [props.value.id],
        });
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Media Category"
            description={
                <>
                    Are you sure you want to delete media category <strong>&quot;{props.value.category}&quot;</strong>?
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
    value?: PartialMediaCategory;
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
