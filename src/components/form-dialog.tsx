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
import type { LinkOptions, RegisteredRouter } from "@tanstack/react-router";

export interface FormDialogProps {
    /** the button's content, e.g. an icon and "Add user" */
    trigger: React.ReactNode;
    title: string;
    description?: string;
    /** the submit button, "Create" by default */
    submit?: string;
    /** the form fields */
    children: React.ReactNode;
}

/** A button opening a form in a dialog, for creating things in the admin. */
export function FormDialog(props: FormDialogProps) {
    return (
        <Dialog>
            <DialogTrigger render={<Button />}>{props.trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                {/* TODO: submit once the backend is there */}
                <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
                    <DialogHeader>
                        <DialogTitle>{props.title}</DialogTitle>
                        {props.description && <DialogDescription>{props.description}</DialogDescription>}
                    </DialogHeader>
                    <FieldGroup>{props.children}</FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline" />}>
                            {m.dialog_cancel()}
                        </DialogClose>
                        <Button type="submit">{props.submit ?? m.dialog_create()}</Button>
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
