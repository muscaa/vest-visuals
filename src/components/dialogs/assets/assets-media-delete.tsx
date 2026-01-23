"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { AssetsMedia } from "@type/assets/media";
import { useAssetsMedia } from "@/hooks/assets/useAssetsMedia";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: AssetsMedia;
}

function ValidDialog(props: ValidProps) {
    const { removeAssetsMedia } = useAssetsMedia();

    const submit = async () => {
        return await removeAssetsMedia.mutateAsync([props.value.id]);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Assets Media"
            description={
                <>
                    Are you sure you want to delete assets media <strong>&quot;{props.value.id}&quot;</strong>?
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
    value?: AssetsMedia;
}

export function AssetsMediaDeleteDialog(props: Props) {
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
