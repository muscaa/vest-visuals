"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { MediaGroup } from "@/types/api/media/groups";
import { useMediaGroups } from "@/hooks/useMediaGroups";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: MediaGroup;
}

function ValidDialog(props: ValidProps) {
    const { removeMediaGroup } = useMediaGroups();

    const submit = async () => {
        return await removeMediaGroup.mutateAsync({
            id: props.value.id,
        });
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Media Group"
            description={
                <>
                    Are you sure you want to delete the media group <strong>&quot;{props.value.id}&quot;</strong>?
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
    value?: MediaGroup;
}

export function MediaGroupsDeleteDialog(props: Props) {
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
