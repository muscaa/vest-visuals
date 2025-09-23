import { z } from "zod";
import { TeamMembersRegistry } from "./team-members";
import { PortfolioCategoriesRegistry } from "./portfolio-categories";

export const registries = {
    team_members: TeamMembersRegistry,
    portfolio_categories: PortfolioCategoriesRegistry,
} as const;

export type RegistryKey = keyof typeof registries;
export type Registries = {
    [K in RegistryKey]: z.infer<typeof registries[K]>;
};
export type Registry<K extends RegistryKey> = Registries[K];
