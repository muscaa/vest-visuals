"use client";

import { SimpleDialog } from "@/components/dialogs/simple";
import { PartialPortfolioCategory } from "@type/portfolio/categories";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";

interface CommonProps {
    onDelete?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialPortfolioCategory;
}

function ValidDialog(props: ValidProps) {
    const { removePortfolioCategories } = usePortfolioCategories();

    const submit = async () => {
        return await removePortfolioCategories.mutateAsync([props.value.id]);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Remove Portfolio Category"
            description={
                <>
                    Are you sure you want to delete portfolio category <strong>&quot;{props.value.tag}&quot;</strong>?
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
    value?: PartialPortfolioCategory;
}

export function PortfolioCategoriesDeleteDialog(props: Props) {
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
