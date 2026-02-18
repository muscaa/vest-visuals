"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { PartialAlbum } from "@type/albums/albums";
import { useAlbums } from "@/hooks/albums/useAlbums";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialAlbum;
}

function ValidDialog(props: ValidProps) {
    const { removeAlbum } = useAlbums();

    const submit = async () => {
        return await removeAlbum.mutateAsync([props.value.id]);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Album"
            description={
                <>
                    Are you sure you want to delete album <strong>&quot;{props.value.id}&quot;</strong>?
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
    value?: PartialAlbum;
}

export function AlbumsDeleteDialog(props: Props) {
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
