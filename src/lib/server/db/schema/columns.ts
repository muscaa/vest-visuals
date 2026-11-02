/** Columns most tables have, the same way everywhere. Functions, so each table gets its own. */
import { timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

/** A UUID v7 primary key: ordered by time, so new rows go at the end of the index instead of anywhere in it. */
export const id = () => uuid("id").primaryKey().$defaultFn(() => uuidv7());

/** When the row was created, and last changed. */
export const timestamps = () => ({
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});
