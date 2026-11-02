import { m } from "@shared/paraglide/messages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IconBrandYoutube, IconDots, IconLoader2, IconPlus, IconStack2, IconTrash, IconUnlink, IconUpload } from "@tabler/icons-react";
import { toast } from "sonner";
import { imageSizeNames } from "@shared/images";
import { portfolioDefaultSizes, portfolioVariantUrl, youtubeId, youtubeShapes } from "@shared/portfolio";
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
import { SizePicker } from "./size-picker";
import type { AdminPortfolioMedia } from "@server/portfolio";
import type { YoutubeShape } from "@shared/portfolio";
import type { DataTableColumn } from "../data-table";
import type { MediaVariant } from "./media";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { useUpload } from "@/hooks/uploads";
import { addMediaToGroup, addYoutubeToGroup, removeMediaFromGroup } from "@/functions/portfolio-groups";
import { changePortfolioMediaVariants, deletePortfolioMedia, portfolioMediaQuery } from "@/functions/portfolio-media";

/** Reloads every portfolio page's data after a change; pages left open hear about it live too. */
export function useRefreshPortfolio() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["admin", "portfolio"] });
}

const videoOf = (media: AdminPortfolioMedia) => media.variants.find((variant) => variant.youtubeId);

/**
 * A media's variants with their urls: a photo's original first, then its sizes; a video's YouTube page. The version
 * makes browsers load a remade one again, as they keep each for an hour.
 */
function variantUrls(media: AdminPortfolioMedia): MediaVariant[] {
    const video = videoOf(media);
    if (video) return [{ tag: "youtube", url: `https://www.youtube.com/watch?v=${video.youtubeId}` }];

    const version = `?v=${media.updatedAt.getTime()}`;
    return media.variants
        .toSorted((a, b) => (a.variant === "original" ? -1 : b.variant === "original" ? 1 : a.width - b.width))
        .map((variant) => ({ tag: variant.variant, url: portfolioVariantUrl(media.id, variant) + version }));
}

/** A small picture of a media: a video's YouTube thumbnail, a photo's smallest size; null while it's processing. */
export function mediaThumbnail(media: Pick<AdminPortfolioMedia, "id" | "variants">) {
    const video = media.variants.find((variant) => variant.youtubeId);
    const smallest = media.variants
        .filter((variant) => variant.variant !== "original")
        .toSorted((a, b) => a.width - b.width)[0];
    const shown = video ?? smallest ?? media.variants.find((variant) => variant.variant === "original");
    return shown ? portfolioVariantUrl(media.id, shown) : null;
}

function MediaPreview(props: { media: AdminPortfolioMedia }) {
    const url = mediaThumbnail(props.media);
    if (!url) {
        return (
            <div className="flex size-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-muted-foreground" title={m.admin_assets_status_processing()}>
                <IconLoader2 className="size-5 animate-spin" />
            </div>
        );
    }
    return <Img src={url} alt={props.media.id} className="size-20 rounded-xl object-cover" />;
}

//
// dialogs
//

type AddMode = "upload" | "existing" | "youtube";

/** Media already in the portfolio but not in this group, to pick from; processing ones can't be picked yet. */
function ExistingMediaPicker(props: { exclude: string[]; value: string[]; onChange: (ids: string[]) => void }) {
    const { data: media = [], isPending } = useQuery(portfolioMediaQuery);
    const choices = media.filter((item) => !props.exclude.includes(item.id) && mediaThumbnail(item));

    if (isPending) return <IconLoader2 className="mx-auto size-5 animate-spin text-muted-foreground" />;
    if (!choices.length) return <FieldDescription>{m.admin_portfolio_no_existing_media()}</FieldDescription>;

    const toggle = (id: string) => props.onChange(props.value.includes(id) ? props.value.filter((value) => value !== id) : [...props.value, id]);
    return (
        // keeps its height and scrolls, with room around for the picked ones' rings
        <div className="max-h-80 shrink-0 overflow-y-auto p-1.5">
            <div className="grid grid-cols-4 gap-2">
                {
                    choices.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            aria-pressed={props.value.includes(item.id)}
                            onClick={() => toggle(item.id)}
                            className="aspect-square overflow-hidden rounded-xl ring-primary ring-offset-2 ring-offset-background aria-pressed:ring-2"
                        >
                            <Img src={mediaThumbnail(item)!} alt={item.id} className="size-full object-cover" />
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

/**
 * Adds to the end of a group: new photos uploaded, media already in the portfolio, or a YouTube video. Uploads go one
 * after another, then it closes; they're processed in the background and show in the table as they're ready. Closing
 * it stops the one still sending.
 */
export function AddMediaDialog(props: { groupId: string; inGroup: string[] }) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<AddMode>("upload");
    const [files, setFiles] = useState<File[]>([]);
    const [sizes, setSizes] = useState(portfolioDefaultSizes);
    const [current, setCurrent] = useState(0);
    const [picked, setPicked] = useState<string[]>([]);
    const [shape, setShape] = useState<YoutubeShape>("landscape");
    const { uploading, progress, upload, cancel } = useUpload();
    const refreshPortfolio = useRefreshPortfolio();

    const onOpenChange = (value: boolean) => {
        if (!value) cancel();
        setFiles([]);
        setSizes(portfolioDefaultSizes);
        setPicked([]);
        setShape("landscape");
        setOpen(value);
    };

    const form = useFormSubmit(async (field) => {
        if (mode === "upload") {
            for (const [index, file] of files.entries()) {
                setCurrent(index);
                const error = await upload(file, { type: "portfolio", data: { groupId: props.groupId, sizes } });
                if (error) return error;
            }
        } else if (mode === "existing") {
            if (!picked.length) return m.admin_portfolio_pick_media();
            await addMediaToGroup({ data: { id: props.groupId, mediaIds: picked } });
        } else {
            const id = youtubeId(field("youtube"));
            if (!id) return m.admin_portfolio_youtube_invalid();
            await addYoutubeToGroup({ data: { id: props.groupId, youtubeId: id, shape } });
        }

        onOpenChange(false);
        await refreshPortfolio();
        toast.success(mode === "upload" ? m.admin_portfolio_uploaded({ count: files.length }) : m.admin_portfolio_media_added());
    });

    return (
        <FormDialog
            open={open}
            onOpenChange={onOpenChange}
            trigger={
                <>
                    <IconPlus data-icon="inline-start" />
                    {m.admin_portfolio_add()}
                </>
            }
            title={m.admin_portfolio_add_media()}
            description={m.admin_portfolio_add_media_description()}
            submit={mode === "upload" ? m.dashboard_upload() : m.admin_portfolio_add()}
            form={form}
        >
            <ToggleGroup variant="outline" value={[mode]} onValueChange={(value) => value[0] && setMode(value[0] as AddMode)} disabled={uploading}>
                <ToggleGroupItem value="upload">
                    <IconUpload />
                    {m.dashboard_upload()}
                </ToggleGroupItem>
                <ToggleGroupItem value="existing">{m.admin_portfolio_existing()}</ToggleGroupItem>
                <ToggleGroupItem value="youtube">
                    <IconBrandYoutube />
                    YouTube
                </ToggleGroupItem>
            </ToggleGroup>
            {
                mode === "upload" && (
                    <>
                        <Field>
                            <FieldLabel htmlFor="media-files">{m.admin_files()}</FieldLabel>
                            <Input
                                id="media-files"
                                type="file"
                                accept={uploadContentTypes.portfolio.join(",")}
                                multiple
                                disabled={uploading}
                                onChange={(event) => setFiles([...event.target.files ?? []])}
                                required
                            />
                            {
                                uploading
                                    ? (
                                        <>
                                            <FieldDescription>{m.admin_portfolio_uploading({ current: current + 1, count: files.length })}</FieldDescription>
                                            <Progress value={progress * 100} aria-label={m.admin_upload_uploading({ percent: Math.round(progress * 100) })} />
                                        </>
                                    )
                                    : <FieldDescription>{m.admin_assets_file_hint()}</FieldDescription>
                            }
                        </Field>
                        <SizePicker value={sizes} onChange={setSizes} disabled={uploading} />
                    </>
                )
            }
            {mode === "existing" && <ExistingMediaPicker exclude={props.inGroup} value={picked} onChange={setPicked} />}
            {
                mode === "youtube" && (
                    <>
                        <Field>
                            <FieldLabel htmlFor="media-youtube">{m.admin_portfolio_youtube_link()}</FieldLabel>
                            <Input id="media-youtube" name="youtube" placeholder="https://www.youtube.com/watch?v=…" required />
                        </Field>
                        <Field>
                            <FieldLabel>{m.admin_portfolio_youtube_shape()}</FieldLabel>
                            <ToggleGroup variant="outline" value={[shape]} onValueChange={(value) => value[0] && setShape(value[0] as YoutubeShape)}>
                                {
                                    (Object.keys(youtubeShapes) as YoutubeShape[]).map((value) => (
                                        <ToggleGroupItem key={value} value={value}>
                                            {value === "landscape" ? m.admin_portfolio_youtube_landscape() : m.admin_portfolio_youtube_portrait()}
                                        </ToggleGroupItem>
                                    ))
                                }
                            </ToggleGroup>
                        </Field>
                    </>
                )
            }
        </FormDialog>
    );
}

/** Remakes a photo's sizes from its original, the chosen ones; in the background, like an upload. */
function ChangeVariantsDialog(props: { media: AdminPortfolioMedia; open: boolean; onOpenChange: (open: boolean) => void }) {
    const current = imageSizeNames.filter((size) => props.media.variants.some((variant) => variant.variant === size));
    const [sizes, setSizes] = useState(current);

    const form = useFormSubmit(async () => {
        await changePortfolioMediaVariants({ data: { id: props.media.id, sizes } });
        props.onOpenChange(false);
        toast.success(m.admin_portfolio_variants_changing());
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={(open) => {
                setSizes(current);
                props.onOpenChange(open);
            }}
            title={m.admin_assets_variants_change()}
            description={m.admin_assets_variants_change_description()}
            submit={m.admin_assets_reprocess()}
            form={form}
        >
            <SizePicker value={sizes} onChange={setSizes} />
        </FormDialog>
    );
}

/** Asks before taking something out or deleting it, then reloads the portfolio pages and says it's done. */
export function ConfirmDialog(props: { title: string; description: string; submit: string; open: boolean; onOpenChange: (open: boolean) => void; action: () => Promise<unknown>; done: string }) {
    const refreshPortfolio = useRefreshPortfolio();

    const form = useFormSubmit(async () => {
        await props.action();
        props.onOpenChange(false);
        await refreshPortfolio();
        toast.success(props.done);
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={props.title}
            description={props.description}
            submit={props.submit}
            destructive
            form={form}
        />
    );
}

/** The "…" menu of a media's row: change a photo's variants, take it out of the group (on a group's page), delete it. */
function MediaActions(props: { media: AdminPortfolioMedia; groupId?: string }) {
    const { media, groupId } = props;
    const photo = !videoOf(media) && media.variants.some((variant) => variant.variant === "original");
    const [dialog, setDialog] = useState<"variants" | "remove" | "delete">();
    const closeDialog = (open: boolean) => setDialog(open ? dialog : undefined);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                    {
                        photo && (
                            <DropdownMenuItem onClick={() => setDialog("variants")}>
                                <IconStack2 />
                                {m.admin_assets_variants_change()}
                            </DropdownMenuItem>
                        )
                    }
                    {
                        groupId && (
                            <DropdownMenuItem onClick={() => setDialog("remove")}>
                                <IconUnlink />
                                {m.admin_portfolio_remove_from_group()}
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
                        <IconTrash />
                        {m.table_delete()}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {
                photo && (
                    <ChangeVariantsDialog
                        key={media.variants.map((variant) => variant.variant).join()}
                        media={media}
                        open={dialog === "variants"}
                        onOpenChange={closeDialog}
                    />
                )
            }
            {
                groupId && (
                    <ConfirmDialog
                        title={m.admin_portfolio_remove_from_group()}
                        description={m.admin_portfolio_remove_media_description()}
                        submit={m.admin_portfolio_remove()}
                        open={dialog === "remove"}
                        onOpenChange={closeDialog}
                        action={() => removeMediaFromGroup({ data: { id: groupId, mediaId: media.id } })}
                        done={m.admin_portfolio_media_removed()}
                    />
                )
            }
            <ConfirmDialog
                title={m.admin_portfolio_delete_media()}
                description={m.admin_portfolio_delete_media_description({ count: media.groupCount })}
                submit={m.table_delete()}
                open={dialog === "delete"}
                onOpenChange={closeDialog}
                action={() => deletePortfolioMedia({ data: { id: media.id } })}
                done={m.admin_portfolio_media_deleted()}
            />
        </>
    );
}

//
// columns
//

/**
 * The columns of a media table. On a group's page (`groupId`) they're ordered by hand, so not sortable, and the menu
 * can take one out of the group; the library shows in how many groups each one is.
 */
export function portfolioMediaColumns(options: { groupId?: string }): DataTableColumn<AdminPortfolioMedia>[] {
    const column = createDataColumns<AdminPortfolioMedia>();
    const sortable = !options.groupId;
    // the header's column is typed per table, so it's taken loosely here
    const title = (text: () => string) => (context: { column: any }) =>
        sortable ? <SortableHeader column={context.column} title={text()} /> : text();

    return column.columns([
        column.display({
            id: "preview",
            header: () => m.admin_preview(),
            cell: ({ row }) => <MediaPreview media={row.original} />,
        }),
        column.accessor((media) => (videoOf(media) ? "video" : "photo"), {
            id: "kind",
            header: () => m.admin_portfolio_kind(),
            filterFn: "equalsString",
            cell: ({ getValue }) => (
                <Badge variant="outline">{getValue() === "video" ? m.admin_portfolio_kind_video() : m.admin_portfolio_kind_photo()}</Badge>
            ),
        }),
        column.display({
            id: "variants",
            header: () => m.dashboard_variants(),
            cell: ({ row }) => <MediaVariants variants={variantUrls(row.original)} />,
        }),
        ...(sortable
            ? [column.accessor("groupCount", {
                header: title(m.account_portfolio_groups),
                sortFn: "basic",
                cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
            })]
            : []),
        column.accessor((media) => media.createdAt.toISOString(), {
            id: "createdAt",
            header: title(m.dashboard_created),
            sortFn: "alphanumeric",
            cell: ({ getValue }) => <span className="text-muted-foreground">{formatDate(getValue())}</span>,
        }),
        column.display({
            id: "actions",
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <MediaActions media={row.original} groupId={options.groupId} />
                </div>
            ),
        }),
    ]) as DataTableColumn<AdminPortfolioMedia>[];
}
