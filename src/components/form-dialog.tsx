import { m } from "@shared/paraglide/messages";
import { IconDots, IconLink, IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FieldGroup } from "./ui/field";
import { FormMessage, SubmitButton } from "./forms/form-parts";
import type { LinkOptions, RegisteredRouter } from "@tanstack/react-router";
import type { useFormSubmit } from "@/hooks/form";

export interface FormDialogProps {
    /** the button's content, e.g. an icon and "Add user"; left out for dialogs opened from a menu, with `open` */
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description?: string;
    /** the submit button, "Create" by default */
    submit?: string;
    /** a red submit button, for deleting */
    destructive?: boolean;
    /** from {@link useFormSubmit}; without it the form isn't sent yet */
    form?: ReturnType<typeof useFormSubmit>;
    /** the form fields */
    children?: React.ReactNode;
}

/** A form in a dialog, for creating and changing things in the admin. Opened by its own button, or from outside. */
export function FormDialog(props: FormDialogProps) {
    const onOpenChange = (open: boolean) => {
        // a new start each time it opens
        props.form?.setError(undefined);
        props.onOpenChange?.(open);
    };

    return (
        <Dialog open={props.open} onOpenChange={onOpenChange}>
            {props.trigger && <DialogTrigger render={<Button />}>{props.trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-lg">
                {/* TODO: the demo pages pass no `form` until their backend is there */}
                <form method="post" onSubmit={props.form?.onSubmit ?? ((event) => event.preventDefault())} className="flex flex-col gap-6">
                    <DialogHeader>
                        <DialogTitle>{props.title}</DialogTitle>
                        {props.description && <DialogDescription>{props.description}</DialogDescription>}
                    </DialogHeader>
                    {props.children && <FieldGroup>{props.children}</FieldGroup>}
                    {props.form?.error && <FormMessage>{props.form.error}</FormMessage>}
                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline" />}>
                            {m.dialog_cancel()}
                        </DialogClose>
                        <SubmitButton pending={props.form?.pending ?? false} size="default" variant={props.destructive ? "destructive" : "default"}>
                            {props.submit ?? m.dialog_create()}
                        </SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

/** The "…" menu at the end of a table row. */
export function RowActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                <IconDots />
            </DropdownMenuTrigger>
            {/* TODO: edit and delete once the backend is there */}
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <IconPencil />
                    {m.table_edit()}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    {m.table_delete()}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/** An icon link on a table row leading to its contents, e.g. a category's groups. Named by its label on hover. */
export function RowLink<const TTo extends string>({ label, ...link }: LinkOptions<RegisteredRouter, string, TTo> & { label: string }) {
    return (
        // typed by the caller's `to`, which the plain Link can't follow through the spread
        <Link {...(link as LinkOptions)} aria-label={label} title={label} className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
            <IconLink />
        </Link>
    );
}
