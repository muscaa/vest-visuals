"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { api_routes } from "@/utils/client/axios";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    id: string;
}

function ValidDialog(props: ValidProps) {
    const submit = async () => {
        return api_routes.media.categories.remove._.post({
            id: props.id,
        });
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Media Category"
            description={
                <>
                    Are you sure you want to delete the media category <strong>&quot;{props.id}&quot;</strong>?
                </>
            }
            submitText={{
                default: "Delete",
                sending: "Deleting...",
            }}
            onSuccess={props.onDelete}
            trigger={props.children}
        />
    );
}

interface Props extends CommonProps {
    id?: string;
}

export function MediaCategoriesDeleteDialog(props: Props) {
    if (!props.id) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            id={props.id}
            onDelete={props.onDelete}
        >
            {props.children}
        </ValidDialog>
    );
}
