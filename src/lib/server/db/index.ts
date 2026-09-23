import { drizzle } from "drizzle-orm/node-postgres";
import { envServer } from "@server/env";
import * as schema from "./schema";

export const db = drizzle(envServer.DATABASE_URL, { schema });
