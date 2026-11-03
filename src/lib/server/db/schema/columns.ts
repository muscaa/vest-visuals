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

/** Crockford's base32: no i, l, o or u, so a link read aloud or typed can't be mistaken */
const tokenAlphabet = "0123456789abcdefghjkmnpqrstvwxyz";

/** A random, url-safe token like `k3x9q2m7vt8wpz4h6nra`: 20 characters, 100 random bits, impossible to guess. */
export function randomToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(20)), (byte) => tokenAlphabet[byte % 32]).join("");
}
