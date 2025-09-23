import { z } from "zod";
import * as team from "./team";
import * as portfolio from "./portfolio";

export const registrySchemas: Record<string, z.ZodType> = {
    team: team.TeamRegistrySchema,
    portfolio: portfolio.PortfolioRegistrySchema,
};

export interface Registries {
    team: team.TeamRegistry;
    portfolio: portfolio.PortfolioRegistry;
}
