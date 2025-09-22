import { Response } from "@type/http";
import { PortfolioRegistry } from "@type/registries/portfolio";

// POST

export type PostRequest = {};

export type PostResponse = Response<{
    value: PortfolioRegistry;
}>;
