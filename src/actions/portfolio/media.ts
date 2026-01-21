"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import { PortfolioMedia } from "@type/portfolio/media";
import * as contents from "@server/portfolio/media";

export async function get(id: string): ActionResponse<PortfolioMedia> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing media ID"];
    }

    const result = await contents.get(id);
    if (!result) {
        return ["NOT_FOUND", "Portfolio media not found"];
    }

    return ["OK", result];
}

// ...
