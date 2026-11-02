/**
 * Uploading, in the order the browser calls these: `startUpload`, `signUploadParts` while sending the parts straight to
 * S3, then `completeUpload`, which starts `processUpload` in the background. See `uploadFile`.
 */
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { start } from "workflow/api";
import { z } from "zod";
import { db } from "@server/db";
import { uploads } from "@server/db/schema";
import { abortMultipartUpload, completeMultipartUpload, createMultipartUpload, deleteObjects, headObject, signedUploadPartUrl } from "@server/s3";
import { findUpload, moveUpload } from "@server/uploads";
import { isAdmin } from "@shared/auth";
import { uploadContentTypes, uploadPartCount, uploadPartSize, uploadTarget } from "@shared/uploads";
import { sessionMiddleware } from "./auth";
import type { UploadTarget } from "@shared/uploads";
import { processUpload } from "@/workflows/process-upload";

/** Who may upload what: assets are the admins'. */
function mayUpload(user: { role?: string | null }, target: UploadTarget) {
    switch (target.type) {
        case "asset":
            return isAdmin(user);
    }
}

/** The user's own upload, or an error; with `status`, only while it's in that one. */
async function ownUpload(id: string, userId: string, status?: string) {
    const upload = await findUpload(id, userId);
    if (!upload || (status && upload.status !== status)) {
        throw new Error("No such upload");
    }
    return upload;
}

/** Starts an upload of one file, returning how to split it into parts. */
export const startUpload = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .validator(z.object({
        target: uploadTarget,
        file: z.object({
            // only a label; slashes would look like folders when it's downloaded
            name: z.string().trim().min(1).max(255).transform((name) => name.replace(/[/\\]/g, "_")),
            type: z.string(),
            size: z.number().int().positive(),
        }),
    }))
    .handler(async ({ data: { target, file }, context }) => {
        if (!mayUpload(context.user, target)) {
            throw new Error("Not allowed to upload this");
        }
        if (!uploadContentTypes[target.type].includes(file.type)) {
            throw new Error(`An upload of type ${target.type} can't be ${file.type || "this file"}`);
        }

        const id = crypto.randomUUID();
        const multipartId = await createMultipartUpload("uploads", id, file.type);
        await db.insert(uploads).values({
            id,
            userId: context.user.id,
            type: target.type,
            data: target.data,
            filename: file.name,
            contentType: file.type,
            size: file.size,
            multipartId,
        });

        return { id, partSize: uploadPartSize(file.size), partCount: uploadPartCount(file.size) };
    });

/** Links to upload these parts to, in the same order; asked for a few at a time, since they expire. */
export const signUploadParts = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .validator(z.object({ id: z.string(), partNumbers: z.array(z.number().int().min(1)).min(1).max(100) }))
    .handler(async ({ data, context }) => {
        const upload = await ownUpload(data.id, context.user.id, "pending");
        const partCount = uploadPartCount(upload.size);
        if (data.partNumbers.some((part) => part > partCount)) {
            throw new Error(`The upload only has ${partCount} parts`);
        }

        return await Promise.all(data.partNumbers.map((part) => signedUploadPartUrl("uploads", upload.id, upload.multipartId, part)));
    });

/** Joins the uploaded parts, checks the file and starts processing it. */
export const completeUpload = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .validator(z.object({
        id: z.string(),
        parts: z.array(z.object({ partNumber: z.number().int().min(1), etag: z.string().min(1) })).min(1),
    }))
    .handler(async ({ data, context }) => {
        const upload = await ownUpload(data.id, context.user.id, "pending");

        // every part, once
        const partCount = uploadPartCount(upload.size);
        const numbers = new Set(data.parts.map((part) => part.partNumber));
        if (data.parts.length !== partCount || numbers.size !== partCount || Math.max(...numbers) !== partCount) {
            throw new Error(`The upload needs its ${partCount} parts, each once`);
        }

        if (!await moveUpload(upload.id, "pending", "uploaded")) {
            throw new Error("The upload was already completed");
        }

        try {
            await completeMultipartUpload("uploads", upload.id, upload.multipartId, data.parts);
            const file = await headObject("uploads", upload.id);
            if (file?.size !== upload.size) {
                throw new Error(`The uploaded file has ${file?.size ?? 0} bytes instead of ${upload.size}`);
            }
        } catch (error) {
            await moveUpload(upload.id, "uploaded", "failed");
            await abortMultipartUpload("uploads", upload.id, upload.multipartId);
            await deleteObjects("uploads", [upload.id]);
            throw error;
        }

        const run = await start(processUpload, [upload.id]);
        await db.update(uploads).set({ workflowRunId: run.runId }).where(eq(uploads.id, upload.id));
    });

/** Stops an upload before it's complete, throwing away what was uploaded. */
export const cancelUpload = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .validator(z.object({ id: z.string() }))
    .handler(async ({ data, context }) => {
        const upload = await ownUpload(data.id, context.user.id);
        if (!await moveUpload(upload.id, "pending", "failed")) return;

        await abortMultipartUpload("uploads", upload.id, upload.multipartId);
        await db.delete(uploads).where(eq(uploads.id, upload.id));
    });
