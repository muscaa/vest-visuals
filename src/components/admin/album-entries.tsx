import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
    IconBrandYoutube,
    IconDots,
    IconFolder,
    IconFolderPlus,
    IconFolderSymlink,
    IconLoader2,
    IconPencil,
    IconPhotoStar,
    IconPlus,
    IconStack2,
    IconTrash,
    IconUpload,
    IconVideo,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { albumDefaultSizes, albumVariantUrl, albumVideoTypes } from "@shared/albums";
import { imageSizeNames } from "@shared/images";
import { youtubeId, youtubeShapes } from "@shared/portfolio";
import { uploadContentTypes } from "@shared/uploads";
import { createDataColumns } from "../data-table";
import { FormDialog, RowLink } from "../form-dialog";
import { Fan } from "../gallery/fan";
import { Img } from "../img";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { AlbumConfirmDialog, useRefreshAlbums } from "./albums";
import { MediaVariants } from "./media";
import { SizePicker } from "./size-picker";
import type { AdminAlbumEntry } from "@server/albums";
import type { YoutubeShape } from "@shared/portfolio";
import type { DataTableColumn } from "../data-table";
import type { MediaVariant } from "./media";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { useUpload } from "@/hooks/uploads";
import {
    addAlbumYoutube,
    albumDirectoriesQuery,
    changeAlbumEntryVariants,
    createAlbumDirectory,
    deleteAlbumEntries,
    moveAlbumEntries,
    renameAlbumDirectory,
    setAlbumCover,
} from "@/functions/albums-admin";

/** Which album and directory a table or dialog works in; the directory is null at the album's root. */
interface Place {
    albumId: string;
    parentId: string | null;
}

const videoOf = (entry: AdminAlbumEntry) => entry.variants.find((variant) => variant.youtubeId);
const originalOf = (entry: AdminAlbumEntry) => entry.variants.find((variant) => variant.variant === "original");

/** What a media is: a photo, or a video with or without its file for downloading. */
function kindOf(entry: AdminAlbumEntry) {
    if (entry.type === "directory") return "directory";
    if (videoOf(entry)) return originalOf(entry) ? "video" : "video-without-file";
    return "photo";
}

/** A small picture of a media: a video's YouTube thumbnail, a photo's smallest size; null while it's processing. */
function thumbnailOf(entry: AdminAlbumEntry) {
    const video = videoOf(entry);
    const smallest = entry.variants
        .filter((variant) => variant.variant !== "original")
        .toSorted((a, b) => a.width - b.width)[0];
    const shown = video ?? smallest ?? originalOf(entry);
    return shown ? albumVariantUrl(entry.id, shown) : null;
}

/** A media's variants with their urls: the original first, then its sizes; a video's YouTube page. */
function variantUrls(entry: AdminAlbumEntry): MediaVariant[] {
    const version = `?v=${entry.updatedAt.getTime()}`;
    return entry.variants
        .toSorted((a, b) => (a.variant === "original" ? -1 : b.variant === "original" ? 1 : a.width - b.width))
        .map((variant) => ({
            tag: variant.youtubeId ? "youtube" : variant.variant,
            url: variant.youtubeId ? `https://www.youtube.com/watch?v=${variant.youtubeId}` : albumVariantUrl(entry.id, variant) + version,
        }));
}

function EntryPreview(props: { entry: AdminAlbumEntry }) {
    const { entry } = props;
    if (entry.type === "directory") {
        return <Fan previews={entry.previews} sizes="80px" className="size-20" />;
    }

    const url = thumbnailOf(entry);
    if (!url) {
        return (
            <div className="flex size-20 items-center justify-center rounded-xl border border-dashed text-muted-foreground" title={m.admin_assets_status_processing()}>
                <IconLoader2 className="size-5 animate-spin" />
            </div>
        );
    }
    return <Img src={url} alt={entry.filename ?? entry.id} className="size-20 rounded-xl object-cover" />;
}

//
// adding
//

type AddMode = "upload" | "directory" | "youtube";

/**
 * Sends files one after another, with a progress bar; the server processes each in the background, as it arrives.
 * Returns an error message, or nothing once all are sent.
 */
function useUploadAll() {
    const { uploading, progress, upload, cancel } = useUpload();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const uploadAll = async (files: File[], target: (file: File) => Parameters<typeof upload>[1]) => {
        setCount(files.length);
        for (const [index, file] of files.entries()) {
            setCurrent(index);
            const error = await upload(file, target(file));
            if (error) return error;
        }
    };

    const status = uploading && (
        <>
            <FieldDescription>{m.admin_portfolio_uploading({ current: current + 1, count })}</FieldDescription>
            <Progress value={progress * 100} aria-label={m.admin_upload_uploading({ percent: Math.round(progress * 100) })} />
        </>
    );
    return { uploadAll, uploading, cancel, status };
}

/**
 * Adds to the end of a directory (or the root): photos uploaded, a new directory, or a video from YouTube with its file
 * for downloading. Closing it stops a file still sending.
 */
export function AddEntryDialog(props: Place) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<AddMode>("upload");
    const [files, setFiles] = useState<File[]>([]);
    const [sizes, setSizes] = useState(albumDefaultSizes);
    const [shape, setShape] = useState<YoutubeShape>("landscape");
    const { uploadAll, uploading, cancel, status } = useUploadAll();
    const refreshAlbums = useRefreshAlbums();

    const onOpenChange = (value: boolean) => {
        if (!value) cancel();
        setFiles([]);
        setSizes(albumDefaultSizes);
        setShape("landscape");
        setOpen(value);
    };

    const form = useFormSubmit(async (field) => {
        if (mode === "upload") {
            const error = await uploadAll(files, () => ({ type: "album", data: { albumId: props.albumId, parentId: props.parentId, sizes } }));
            if (error) return error;
        } else if (mode === "directory") {
            await createAlbumDirectory({ data: { ...props, name: field("name") } });
        } else {
            const id = youtubeId(field("youtube"));
            if (!id) return m.admin_portfolio_youtube_invalid();
            const { entryId } = await addAlbumYoutube({ data: { ...props, youtubeId: id, shape } });
            // its file next, for downloading; the video is there already, so a failed upload can be tried again from its menu
            const error = await uploadAll(files, () => ({ type: "album_video", data: { albumId: props.albumId, entryId } }));
            if (error) return error;
        }

        onOpenChange(false);
        await refreshAlbums();
        toast.success(mode === "upload" ? m.admin_portfolio_uploaded({ count: files.length }) : m.admin_portfolio_media_added());
    });

    const shapes = (Object.keys(youtubeShapes) as YoutubeShape[]).map((value) => (
        <ToggleGroupItem key={value} value={value}>
            {value === "landscape" ? m.admin_portfolio_youtube_landscape() : m.admin_portfolio_youtube_portrait()}
        </ToggleGroupItem>
    ));

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
            title={m.admin_albums_add()}
            description={m.admin_albums_add_entries_description()}
            submit={mode === "upload" ? m.dashboard_upload() : mode === "directory" ? m.dialog_create() : m.admin_portfolio_add()}
            form={form}
        >
            <ToggleGroup
                variant="outline"
                value={[mode]}
                onValueChange={(value) => {
                    if (!value[0]) return;
                    setMode(value[0] as AddMode);
                    setFiles([]);
                }}
                disabled={uploading}
            >
                <ToggleGroupItem value="upload">
                    <IconUpload />
                    {m.dashboard_upload()}
                </ToggleGroupItem>
                <ToggleGroupItem value="directory">
                    <IconFolderPlus />
                    {m.admin_albums_directory()}
                </ToggleGroupItem>
                <ToggleGroupItem value="youtube">
                    <IconBrandYoutube />
                    YouTube
                </ToggleGroupItem>
            </ToggleGroup>
            {
                mode === "upload" && (
                    <>
                        <Field>
                            <FieldLabel htmlFor="entry-files">{m.admin_files()}</FieldLabel>
                            <Input
                                id="entry-files"
                                type="file"
                                accept={uploadContentTypes.album.join(",")}
                                multiple
                                disabled={uploading}
                                onChange={(event) => setFiles([...event.target.files ?? []])}
                                required
                            />
                            {status || <FieldDescription>{m.admin_assets_file_hint()}</FieldDescription>}
                        </Field>
                        <SizePicker value={sizes} onChange={setSizes} disabled={uploading} />
                    </>
                )
            }
            {
                mode === "directory" && (
                    <Field>
                        <FieldLabel htmlFor="entry-name">{m.common_name()}</FieldLabel>
                        <Input id="entry-name" name="name" maxLength={100} required />
                        <FieldDescription>{m.admin_albums_directory_hint()}</FieldDescription>
                    </Field>
                )
            }
            {
                mode === "youtube" && (
                    <>
                        <Field>
                            <FieldLabel htmlFor="entry-youtube">{m.admin_portfolio_youtube_link()}</FieldLabel>
                            <Input id="entry-youtube" name="youtube" placeholder="https://www.youtube.com/watch?v=…" disabled={uploading} required />
                        </Field>
                        <Field>
                            <FieldLabel>{m.admin_portfolio_youtube_shape()}</FieldLabel>
                            <ToggleGroup variant="outline" value={[shape]} onValueChange={(value) => value[0] && setShape(value[0] as YoutubeShape)} disabled={uploading}>
                                {shapes}
                            </ToggleGroup>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="entry-video">{m.admin_albums_video_file()}</FieldLabel>
                            <Input
                                id="entry-video"
                                type="file"
                                accept={albumVideoTypes.join(",")}
                                disabled={uploading}
                                onChange={(event) => setFiles([...event.target.files ?? []].slice(0, 1))}
                            />
                            {status || <FieldDescription>{m.admin_albums_video_file_hint()}</FieldDescription>}
                        </Field>
                    </>
                )
            }
        </FormDialog>
    );
}

/** Uploads a video's file, for downloading; another one replaces it. */
function VideoFileDialog(props: { albumId: string; entry: AdminAlbumEntry; open: boolean; onOpenChange: (open: boolean) => void }) {
    const [files, setFiles] = useState<File[]>([]);
    const { uploadAll, uploading, cancel, status } = useUploadAll();
    const refreshAlbums = useRefreshAlbums();

    const onOpenChange = (open: boolean) => {
        if (!open) cancel();
        setFiles([]);
        props.onOpenChange(open);
    };

    const form = useFormSubmit(async () => {
        const error = await uploadAll(files, () => ({ type: "album_video", data: { albumId: props.albumId, entryId: props.entry.id } }));
        if (error) return error;
        onOpenChange(false);
        await refreshAlbums();
        toast.success(m.admin_portfolio_uploaded({ count: 1 }));
    });

    return (
        <FormDialog open={props.open} onOpenChange={onOpenChange} title={m.admin_albums_video_file()} submit={m.dashboard_upload()} form={form}>
            <Field>
                <FieldLabel htmlFor="video-file">{m.admin_albums_video_file()}</FieldLabel>
                <Input
                    id="video-file"
                    type="file"
                    accept={albumVideoTypes.join(",")}
                    disabled={uploading}
                    onChange={(event) => setFiles([...event.target.files ?? []].slice(0, 1))}
                    required
                />
                {status || <FieldDescription>{m.admin_albums_video_file_hint()}</FieldDescription>}
            </Field>
        </FormDialog>
    );
}

//
// moving
//

interface DirectoryNode {
    id: string;
    name: string;
    depth: number;
}

/** The album's directories as an indented list, in their order, each under its parent. */
function flattenTree(directories: { id: string; parentId: string | null; name: string | null; position: number }[]) {
    const nodes: DirectoryNode[] = [];
    const visit = (parentId: string | null, depth: number) => {
        for (const directory of directories.filter((item) => item.parentId === parentId).toSorted((a, b) => a.position - b.position)) {
            nodes.push({ id: directory.id, name: directory.name ?? "", depth });
            visit(directory.id, depth + 1);
        }
    };
    visit(null, 0);
    return nodes;
}

/** Picks a directory (or the root) to move an entry to; a directory can't go into itself or what's inside it. */
function MoveDialog(props: { albumId: string; entry: AdminAlbumEntry; open: boolean; onOpenChange: (open: boolean) => void }) {
    const { data: directories, isPending } = useQuery({ ...albumDirectoriesQuery(props.albumId), enabled: props.open });
    const [target, setTarget] = useState<string | null>();
    const refreshAlbums = useRefreshAlbums();

    const nodes = flattenTree(directories ?? []);
    // the entry itself and everything under it, when it's a directory
    const blocked = new Set<string>([props.entry.id]);
    for (const node of nodes) {
        const parent = directories?.find((directory) => directory.id === node.id)?.parentId;
        if (parent && blocked.has(parent)) blocked.add(node.id);
    }

    const form = useFormSubmit(async () => {
        if (target === undefined) return m.admin_albums_pick_directory();
        await moveAlbumEntries({ data: { albumId: props.albumId, parentId: target, entryIds: [props.entry.id] } });
        props.onOpenChange(false);
        await refreshAlbums();
        toast.success(m.admin_albums_moved());
    });

    const option = (id: string | null, name: string, depth: number) => (
        <button
            key={id ?? "root"}
            type="button"
            disabled={id !== null && blocked.has(id)}
            aria-pressed={target === id}
            onClick={() => setTarget(id)}
            style={{ paddingLeft: `${0.75 + depth * 1.25}rem` }}
            className="flex items-center gap-2 rounded-lg py-2 pr-3 text-left hover:bg-muted disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-primary/10 aria-pressed:ring-1 aria-pressed:ring-primary"
        >
            <IconFolder className="size-4 shrink-0 text-muted-foreground" />
            {name}
        </button>
    );

    return (
        <FormDialog
            open={props.open}
            onOpenChange={(open) => {
                setTarget(undefined);
                props.onOpenChange(open);
            }}
            title={m.admin_albums_move()}
            description={m.admin_albums_move_description()}
            submit={m.admin_albums_move_submit()}
            form={form}
        >
            {
                isPending
                    ? <IconLoader2 className="mx-auto size-5 animate-spin text-muted-foreground" />
                    : (
                        // keeps its height and scrolls, with room around for the picked one's ring
                        <div className="flex max-h-80 shrink-0 flex-col gap-0.5 overflow-y-auto p-1">
                            {option(null, m.admin_albums_root(), 0)}
                            {nodes.map((node) => option(node.id, node.name, node.depth + 1))}
                        </div>
                    )
            }
        </FormDialog>
    );
}

//
// the rest of a row's menu
//

function RenameDialog(props: { albumId: string; entry: AdminAlbumEntry; open: boolean; onOpenChange: (open: boolean) => void }) {
    const refreshAlbums = useRefreshAlbums();

    const form = useFormSubmit(async (field) => {
        await renameAlbumDirectory({ data: { albumId: props.albumId, id: props.entry.id, name: field("name") } });
        props.onOpenChange(false);
        await refreshAlbums();
        toast.success(m.account_settings_saved());
    });

    return (
        <FormDialog open={props.open} onOpenChange={props.onOpenChange} title={m.admin_albums_rename()} submit={m.dashboard_save()} form={form}>
            <Field>
                <FieldLabel htmlFor="directory-name">{m.common_name()}</FieldLabel>
                <Input id="directory-name" name="name" defaultValue={props.entry.name ?? ""} maxLength={100} required />
                <FieldDescription>{m.admin_albums_directory_hint()}</FieldDescription>
            </Field>
        </FormDialog>
    );
}

function VariantsDialog(props: { albumId: string; entry: AdminAlbumEntry; open: boolean; onOpenChange: (open: boolean) => void }) {
    const current = imageSizeNames.filter((size) => props.entry.variants.some((variant) => variant.variant === size));
    const [sizes, setSizes] = useState(current);

    const form = useFormSubmit(async () => {
        await changeAlbumEntryVariants({ data: { albumId: props.albumId, entryId: props.entry.id, sizes } });
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

type Dialog = "rename" | "move" | "variants" | "video" | "delete";

function EntryActions(props: { albumId: string; entry: AdminAlbumEntry; cover: boolean }) {
    const { albumId, entry } = props;
    const kind = kindOf(entry);
    const ready = entry.type === "directory" || thumbnailOf(entry) !== null;
    const [dialog, setDialog] = useState<Dialog>();
    const closeDialog = (open: boolean) => setDialog(open ? dialog : undefined);
    const refreshAlbums = useRefreshAlbums();

    const makeCover = async () => {
        await setAlbumCover({ data: { albumId, entryId: props.cover ? null : entry.id } });
        await refreshAlbums();
        toast.success(props.cover ? m.admin_albums_cover_cleared() : m.admin_albums_cover_set());
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-52">
                    {
                        kind === "directory" && (
                            <DropdownMenuItem onClick={() => setDialog("rename")}>
                                <IconPencil />
                                {m.admin_albums_rename()}
                            </DropdownMenuItem>
                        )
                    }
                    {
                        kind !== "directory" && ready && (
                            <DropdownMenuItem onClick={makeCover}>
                                <IconPhotoStar />
                                {props.cover ? m.admin_albums_cover_clear() : m.admin_albums_cover_make()}
                            </DropdownMenuItem>
                        )
                    }
                    {
                        kind === "photo" && ready && (
                            <DropdownMenuItem onClick={() => setDialog("variants")}>
                                <IconStack2 />
                                {m.admin_assets_variants_change()}
                            </DropdownMenuItem>
                        )
                    }
                    {
                        (kind === "video" || kind === "video-without-file") && (
                            <DropdownMenuItem onClick={() => setDialog("video")}>
                                <IconVideo />
                                {m.admin_albums_video_file()}
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuItem onClick={() => setDialog("move")}>
                        <IconFolderSymlink />
                        {m.admin_albums_move()}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
                        <IconTrash />
                        {m.table_delete()}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {kind === "directory" && <RenameDialog key={entry.name} albumId={albumId} entry={entry} open={dialog === "rename"} onOpenChange={closeDialog} />}
            {kind === "photo" && <VariantsDialog key={entry.variants.length} albumId={albumId} entry={entry} open={dialog === "variants"} onOpenChange={closeDialog} />}
            {kind !== "directory" && kind !== "photo" && <VideoFileDialog albumId={albumId} entry={entry} open={dialog === "video"} onOpenChange={closeDialog} />}
            <MoveDialog albumId={albumId} entry={entry} open={dialog === "move"} onOpenChange={closeDialog} />
            <AlbumConfirmDialog
                title={kind === "directory" ? m.admin_albums_delete_directory() : m.admin_portfolio_delete_media()}
                description={kind === "directory" ? m.admin_albums_delete_directory_description({ count: entry.childCount }) : m.admin_albums_delete_entry_description()}
                submit={m.table_delete()}
                destructive
                open={dialog === "delete"}
                onOpenChange={closeDialog}
                action={() => deleteAlbumEntries({ data: { albumId, entryIds: [entry.id] } })}
                done={m.admin_portfolio_media_deleted()}
            />
        </>
    );
}

//
// the table
//

const kindLabels = {
    directory: m.admin_albums_directory,
    photo: m.admin_portfolio_kind_photo,
    video: m.admin_portfolio_kind_video,
    "video-without-file": m.admin_albums_video_without_file,
};

/** The columns of a directory's entries, ordered by hand. `coverId` marks the album's chosen cover. */
export function albumEntryColumns(options: { albumId: string; coverId: string | null }): DataTableColumn<AdminAlbumEntry>[] {
    const column = createDataColumns<AdminAlbumEntry>();

    return column.columns([
        column.display({
            id: "preview",
            header: () => m.admin_preview(),
            cell: ({ row }) => <EntryPreview entry={row.original} />,
        }),
        column.accessor((entry) => entry.name ?? entry.filename ?? "", {
            id: "name",
            header: () => m.common_name(),
            cell: ({ row }) => {
                const entry = row.original;
                return entry.type === "directory"
                    ? (
                        <Link to="/admin/albums/$id" params={{ id: options.albumId }} search={{ directory: entry.id }} className="font-medium hover:underline">
                            {entry.name}
                        </Link>
                    )
                    : (
                        <span className="flex items-center gap-2">
                            <span className="max-w-64 truncate" title={entry.filename ?? undefined}>{entry.filename}</span>
                            {options.coverId === entry.id && <Badge variant="outline">{m.admin_albums_cover()}</Badge>}
                        </span>
                    );
            },
        }),
        column.display({
            id: "kind",
            header: () => m.admin_portfolio_kind(),
            cell: ({ row }) => {
                const kind = kindOf(row.original);
                return <Badge variant={kind === "video-without-file" ? "destructive" : "outline"}>{kindLabels[kind]()}</Badge>;
            },
        }),
        column.display({
            id: "contents",
            header: () => m.dashboard_variants(),
            cell: ({ row }) => row.original.type === "directory"
                ? <span className="text-muted-foreground">{m.admin_albums_directory_count({ count: row.original.childCount })}</span>
                : <MediaVariants variants={variantUrls(row.original)} />,
        }),
        column.accessor((entry) => entry.createdAt.toISOString(), {
            id: "createdAt",
            header: () => m.dashboard_created(),
            cell: ({ getValue }) => <span className="text-muted-foreground">{formatDate(getValue())}</span>,
        }),
        column.display({
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    {
                        row.original.type === "directory" && (
                            <RowLink
                                label={m.admin_albums_open_directory()}
                                to="/admin/albums/$id"
                                params={{ id: options.albumId }}
                                search={{ directory: row.original.id }}
                            />
                        )
                    }
                    <EntryActions albumId={options.albumId} entry={row.original} cover={options.coverId === row.original.id} />
                </div>
            ),
        }),
    ]) as DataTableColumn<AdminAlbumEntry>[];
}
