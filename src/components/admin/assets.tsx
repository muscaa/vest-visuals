import { m } from "@shared/paraglide/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IconDots, IconPhoto, IconReplace, IconStack2, IconTrash, IconUpload } from "@tabler/icons-react";
import { toast } from "sonner";
import { assetFile, assetKeys, assetSizeNames, assetSizes } from "@shared/assets";
import { publicUrl } from "@shared/s3";
import { uploadContentTypes } from "@shared/uploads";
import { SortableHeader, createDataColumns } from "../data-table";
import { FormDialog } from "../form-dialog";
import { Img } from "../img";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { MediaVariants } from "./media";
import type { AssetSize } from "@shared/assets";
import type { DataTableFilter } from "../data-table";
import type { MediaVariant } from "./media";
import type { AdminAsset, AssetStatus } from "@/functions/assets";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { useUpload } from "@/hooks/uploads";
import { assetsQuery, changeAssetVariants, deleteAsset } from "@/functions/assets";

const statuses: Record<AssetStatus, () => string> = {
    ready: m.admin_assets_status_ready,
    missing: m.admin_assets_status_missing,
    unlisted: m.admin_assets_status_unlisted,
    processing: m.admin_assets_status_processing,
    failed: m.admin_assets_status_failed,
};

const statusBadges: Record<AssetStatus, "outline" | "secondary" | "destructive"> = {
    ready: "outline",
    missing: "destructive",
    unlisted: "secondary",
    processing: "secondary",
    failed: "destructive",
};

/**
 * Its stored variants' urls, the original first, then by size. The version makes browsers load a replaced one again,
 * as they keep each for an hour.
 */
function variantUrls(asset: AdminAsset): MediaVariant[] {
    const version = asset.updatedAt ? `?v=${asset.updatedAt.getTime()}` : "";
    return asset.variants
        .toSorted((a, b) => (a.variant === "original" ? -1 : b.variant === "original" ? 1 : a.width - b.width))
        .map(({ variant, contentType }) => ({ tag: variant, url: publicUrl("assets", assetFile(asset.key, variant, contentType)) + version }));
}

/** Reloads the table after changing an asset. */
function useRefreshAssets() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: assetsQuery.queryKey });
}

/** Which sizes to make: the original is always there, each size can be left out. */
function SizePicker(props: { value: AssetSize[]; onChange: (sizes: AssetSize[]) => void; disabled?: boolean }) {
    return (
        <Field>
            <FieldLabel>{m.dashboard_variants()}</FieldLabel>
            <ToggleGroup
                multiple
                variant="outline"
                value={["original", ...props.value]}
                onValueChange={(value) => props.onChange(assetSizeNames.filter((size) => value.includes(size)))}
                disabled={props.disabled}
            >
                <ToggleGroupItem value="original" disabled>original</ToggleGroupItem>
                {
                    assetSizeNames.map((size) => (
                        <ToggleGroupItem key={size} value={size} title={`${assetSizes[size].short}px`}>
                            {size}
                        </ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
            <FieldDescription>{m.admin_assets_variants_hint()}</FieldDescription>
        </Field>
    );
}

/**
 * Sends an image for a key, the row's own or one typed in, then closes; the server processes it in the background and
 * the table shows when it's ready. Closing it while sending stops the upload, as the file is only in the browser.
 */
export function UploadAssetDialog(props: { assetKey?: string; open?: boolean; onOpenChange?: (open: boolean) => void }) {
    const [ownOpen, setOwnOpen] = useState(false);
    const [file, setFile] = useState<File>();
    const [sizes, setSizes] = useState(assetSizeNames);
    const { uploading, progress, upload, cancel } = useUpload();
    const refreshAssets = useRefreshAssets();

    const onOpenChange = (open: boolean) => {
        if (!open) cancel();
        setFile(undefined);
        setSizes(assetSizeNames);
        setOwnOpen(open);
        props.onOpenChange?.(open);
    };

    const form = useFormSubmit(async (field) => {
        const key = props.assetKey ?? field("key").trim();
        if (!file) return;

        const error = await upload(file, { type: "asset", data: { key, sizes } });
        if (error) return error;

        onOpenChange(false);
        await refreshAssets();
        toast.success(m.admin_assets_uploaded({ key }));
    });

    return (
        <FormDialog
            open={props.open ?? ownOpen}
            onOpenChange={onOpenChange}
            trigger={
                props.open === undefined && (
                    <>
                        <IconUpload data-icon="inline-start" />
                        {m.dashboard_upload()}
                    </>
                )
            }
            title={props.assetKey ? m.admin_assets_upload_title({ key: props.assetKey }) : m.dashboard_upload()}
            description={m.admin_assets_upload_description()}
            submit={m.dashboard_upload()}
            form={form}
        >
            {
                !props.assetKey && (
                    <Field>
                        <FieldLabel htmlFor="asset-key">{m.admin_assets_key()}</FieldLabel>
                        <Input id="asset-key" name="key" list="asset-keys" pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} className="font-mono" required />
                        {/* the listed keys, as suggestions */}
                        <datalist id="asset-keys">
                            {assetKeys.map((key) => <option key={key} value={key} />)}
                        </datalist>
                        <FieldDescription>{m.admin_assets_key_hint()}</FieldDescription>
                    </Field>
                )
            }
            <Field>
                <FieldLabel htmlFor="asset-file">{m.admin_assets_file()}</FieldLabel>
                <Input
                    id="asset-file"
                    type="file"
                    accept={uploadContentTypes.asset.join(",")}
                    disabled={uploading}
                    onChange={(event) => setFile(event.target.files?.[0])}
                    required
                />
                {
                    uploading
                        ? <Progress value={progress * 100} aria-label={m.admin_upload_uploading({ percent: Math.round(progress * 100) })} />
                        : <FieldDescription>{m.admin_assets_file_hint()}</FieldDescription>
                }
            </Field>
            <SizePicker value={sizes} onChange={setSizes} disabled={uploading} />
        </FormDialog>
    );
}

/** Remakes the asset's sizes from its original, the chosen ones; it happens in the background, like an upload. */
function ChangeVariantsDialog(props: { asset: AdminAsset; open: boolean; onOpenChange: (open: boolean) => void }) {
    const { asset } = props;
    const current = assetSizeNames.filter((size) => asset.variants.some((variant) => variant.variant === size));
    const [sizes, setSizes] = useState(current);
    const refreshAssets = useRefreshAssets();

    const onOpenChange = (open: boolean) => {
        setSizes(current);
        props.onOpenChange(open);
    };

    const form = useFormSubmit(async () => {
        await changeAssetVariants({ data: { key: asset.key, sizes } });
        props.onOpenChange(false);
        await refreshAssets();
        toast.success(m.admin_assets_variants_changing({ key: asset.key }));
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={onOpenChange}
            title={m.admin_assets_variants_change()}
            description={m.admin_assets_variants_change_description()}
            submit={m.admin_assets_reprocess()}
            form={form}
        >
            <SizePicker value={sizes} onChange={setSizes} />
        </FormDialog>
    );
}

function DeleteAssetDialog(props: { assetKey: string; open: boolean; onOpenChange: (open: boolean) => void }) {
    const refreshAssets = useRefreshAssets();

    const form = useFormSubmit(async () => {
        await deleteAsset({ data: { key: props.assetKey } });
        await refreshAssets();
        props.onOpenChange(false);
        toast.success(m.admin_assets_deleted({ key: props.assetKey }));
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={m.admin_assets_delete()}
            description={m.admin_assets_delete_description({ key: props.assetKey })}
            submit={m.table_delete()}
            destructive
            form={form}
        />
    );
}

/** The "…" menu of an asset's row: upload or replace, and delete once there's something to delete. */
function AssetActions(props: { asset: AdminAsset }) {
    const { asset } = props;
    const stored = asset.variants.length > 0;
    const [dialog, setDialog] = useState<"upload" | "variants" | "delete">();
    const closeDialog = (open: boolean) => setDialog(open ? dialog : undefined);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuItem onClick={() => setDialog("upload")}>
                        {stored ? <IconReplace /> : <IconUpload />}
                        {stored ? m.admin_assets_replace() : m.dashboard_upload()}
                    </DropdownMenuItem>
                    {
                        stored && (
                            <>
                                <DropdownMenuItem onClick={() => setDialog("variants")}>
                                    <IconStack2 />
                                    {m.admin_assets_variants_change()}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
                                    <IconTrash />
                                    {m.table_delete()}
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <UploadAssetDialog assetKey={asset.key} open={dialog === "upload"} onOpenChange={closeDialog} />
            {
                stored && (
                    <>
                        {/* keyed by its variants, so it starts from the stored ones once they change */}
                        <ChangeVariantsDialog
                            key={asset.variants.map((variant) => variant.variant).join()}
                            asset={asset}
                            open={dialog === "variants"}
                            onOpenChange={closeDialog}
                        />
                        <DeleteAssetDialog assetKey={asset.key} open={dialog === "delete"} onOpenChange={closeDialog} />
                    </>
                )
            }
        </>
    );
}

/** The smallest stored size, or the original when there's no size. */
function AssetPreview(props: { asset: AdminAsset }) {
    const urls = variantUrls(props.asset);
    const preview = urls[1] ?? urls[0];
    if (!preview) {
        return (
            <div className="flex size-20 items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                <IconPhoto />
            </div>
        );
    }
    return <Img src={preview.url} alt={props.asset.key} className="size-20 rounded-xl object-cover" />;
}

const column = createDataColumns<AdminAsset>();

const dateColumn = (id: "createdAt" | "updatedAt", title: () => string) => column.accessor((asset) => asset[id]?.toISOString() ?? "", {
    id,
    header: ({ column: header }) => <SortableHeader column={header} title={title()} />,
    sortFn: "alphanumeric",
    cell: ({ getValue }) => getValue() && <span className="text-muted-foreground">{formatDate(getValue())}</span>,
});

export const assetColumns = column.columns([
    column.display({
        id: "preview",
        header: () => m.admin_preview(),
        cell: ({ row }) => <AssetPreview asset={row.original} />,
    }),
    column.accessor("key", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_assets_key()} />,
        sortFn: "alphanumeric",
        cell: ({ getValue }) => <span className="font-mono text-sm-2">{getValue()}</span>,
    }),
    column.accessor("status", {
        header: () => m.admin_users_status(),
        filterFn: "equalsString",
        cell: ({ getValue }) => <Badge variant={statusBadges[getValue()]}>{statuses[getValue()]()}</Badge>,
    }),
    column.display({
        id: "dimensions",
        header: () => m.admin_assets_dimensions(),
        cell: ({ row }) => {
            const original = row.original.variants.find((variant) => variant.variant === "original");
            return original && <span className="text-muted-foreground">{original.width} × {original.height}</span>;
        },
    }),
    column.display({
        id: "variants",
        header: () => m.dashboard_variants(),
        cell: ({ row }) => <MediaVariants variants={variantUrls(row.original)} />,
    }),
    dateColumn("createdAt", m.dashboard_created),
    dateColumn("updatedAt", m.dashboard_updated),
    column.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <AssetActions asset={row.original} />
            </div>
        ),
    }),
]);

export const assetFilters: DataTableFilter[] = [
    {
        column: "status",
        title: m.admin_users_status,
        options: (Object.keys(statuses) as AssetStatus[]).map((status) => ({ value: status, label: statuses[status] })),
    },
];
