"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { PortfolioMedia } from "@type/portfolio/media";
import { usePortfolioMedia } from "@/hooks/portfolio/usePortfolioMedia";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PortfolioMedia;
}

function ValidDialog(props: ValidProps) {
    const { removePortfolioMedia } = usePortfolioMedia();

    const submit = async () => {
        return await removePortfolioMedia.mutateAsync([props.value.id]);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Portfolio Media"
            description={
                <>
                    Are you sure you want to delete portfolio media <strong>&quot;{props.value.id}&quot;</strong>?
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
    value?: PortfolioMedia;
}

export function PortfolioMediaDeleteDialog(props: Props) {
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
