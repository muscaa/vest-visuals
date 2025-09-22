import { Response } from "@type/http";
import { TeamRegistry } from "@type/registries/team";

// POST

export type PostRequest = {};

export type PostResponse = Response<{
    value: TeamRegistry;
}>;
