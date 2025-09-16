"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { MediaContent } from "@type/media/contents";
import { useMediaContents } from "@/hooks/useMediaContents";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: MediaContent;
}

function ValidDialog(props: ValidProps) {
    const { removeMediaContents } = useMediaContents();

    const submit = async () => {
        return await removeMediaContents.mutateAsync({
            ids: [props.value.id],
        });
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Media Content"
            description={
                <>
                    Are you sure you want to delete media content <strong>&quot;{props.value.id}&quot;</strong>?
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
    value?: MediaContent;
}

export function MediaContentsDeleteDialog(props: Props) {
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
