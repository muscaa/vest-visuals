"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { PartialAlbumsContent } from "@type/albums/contents";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialAlbumsContent;
}

function ValidDialog(props: ValidProps) {
    const { removeAlbumsContent } = useAlbumsContents();

    const submit = async () => {
        return await removeAlbumsContent.mutateAsync(props.value.id);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Album Content"
            description={
                <>
                    Are you sure you want to delete album content <strong>&quot;{props.value.id}&quot;</strong>?
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
    value?: PartialAlbumsContent;
}

export function AlbumsContentsDeleteDialog(props: Props) {
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
