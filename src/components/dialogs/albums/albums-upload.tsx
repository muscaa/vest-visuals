"use client";

import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { useAlbums } from "@/hooks/albums/useAlbums";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { PartialAlbum } from "@type/albums/albums";
import { directMultipartUpload } from "@client/s3";

interface CommonProps {
    onUpload?: () => void;
    children?: React.ReactNode;
}

interface ValidProps extends CommonProps {
    value: PartialAlbum;
}

function ValidDialog(props: ValidProps) {
    const [zip, setZip] = useState<File>();
    const [uploadProgress, setUploadProgress] = useState<{ at: number; max: number; }>();
    const { startUploadAlbum, finishUploadAlbum } = useAlbums();

    const submit = async () => {
        if (!zip) return undefined;

        return await directMultipartUpload({
            file: zip,
            start: (partCount) => startUploadAlbum.mutateAsync({ id: props.value.id, partCount }),
            finish: (uploadId, parts) => finishUploadAlbum.mutateAsync({ id: props.value.id, uploadId, parts }),
            onProgress: (at, max) => setUploadProgress({ at, max }),
        });
    };

    const handleReset = () => {
        setZip(undefined);
        setUploadProgress(undefined);
    };

    return (
        <SimpleDialog
            submit={submit}
            title="Upload Album Zip"
            description="Upload the album zip."
            submitText={{
                default: "Upload",
                sending: "Uploading...",
            }}
            submitDisabled={!zip}
            onSuccess={props.onUpload}
            onReset={handleReset}
            trigger={props.children}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="zip">Zip</FieldLabel>
                    <Input
                        id="zip"
                        type="file"
                        placeholder="zip"
                        accept="application/zip"
                        onChange={(e) => setZip(Array.from(e.target.files!)[0])}
                    />
                </Field>
                {
                    uploadProgress && (
                        <Progress
                            value={uploadProgress.at * 100 / uploadProgress.max}
                            max={100}
                        />
                    )
                }
            </FieldGroup>
        </SimpleDialog>
    );
}

interface Props extends CommonProps {
    value?: PartialAlbum;
}

export function AlbumsUploadDialog(props: Props) {
    if (!props.value) return (
        <>
            {props.children}
        </>
    );

    return (
        <ValidDialog
            value={props.value}
            onUpload={props.onUpload}
        >
            {props.children}
        </ValidDialog>
    );
}
