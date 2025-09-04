import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { serverConfig } from "@server/config";

export const libsql = createClient({
    url: serverConfig.env.LIBSQL_URL,
    authToken: serverConfig.env.LIBSQL_AUTH,
});
export const db = drizzle({ client: libsql });
