"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import { execute } from "@server/cli";

export async function executeCommand(input: string): ActionResponse<string[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!input) {
        return ["BAD_REQUEST", "Missing command input"];
    }

    const output = await execute(input);

    return ["OK", output];
}
