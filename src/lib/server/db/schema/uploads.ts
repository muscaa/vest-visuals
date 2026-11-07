import { relations } from "drizzle-orm";
import { bigint, jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { uploadStatuses, uploadTypes } from "@shared/uploads";
import { user } from "./auth";
import { id, timestamps } from "./columns";
import type { UploadData } from "@shared/uploads";

export const uploadType = pgEnum("upload_type", uploadTypes);
export const uploadStatus = pgEnum("upload_status", uploadStatuses);

/**
 * A file on its way in, stored in the private `uploads` bucket under the upload's id until `processUpload` moves it
 * where its type says. Rows only matter while that runs; the daily cleanup removes the abandoned ones.
 */
export const uploads = pgTable("uploads", {
    /** also its file's key in the uploads bucket */
    id: id(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    type: uploadType("type").notNull(),
    /** what the type needs, e.g. the asset's key; parsed with `uploadTarget` before it's used */
    data: jsonb("data").$type<UploadData>().notNull(),
    /** as the user's file was named; only a label, the file is stored under the id */
    filename: text("filename").notNull(),
    /** MIME type, e.g. image/jpeg */
    contentType: text("content_type").notNull(),
    /** in bytes */
    size: bigint("size", { mode: "number" }).notNull(),
    status: uploadStatus("status").default("pending").notNull(),
    /** S3's id of the multipart upload the parts go to */
    multipartId: text("multipart_id").notNull(),
    /** the `processUpload` run, once started */
    workflowRunId: text("workflow_run_id"),
    ...timestamps(),
});

/** For `db.query`; the user's side can't list them, `auth.ts` is generated. */
export const uploadsRelations = relations(uploads, ({ one }) => ({
    user: one(user, {
        fields: [uploads.userId],
        references: [user.id],
    }),
}));
