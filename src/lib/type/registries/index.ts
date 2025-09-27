import { z } from "zod";
import { TeamMembersRegistry } from "./team-members";
import { PortfolioCategoriesRegistry } from "./portfolio-categories";
import { FAQRegistry } from "./faq";
import { ParallaxRegistry } from "./parallax";

export const Registries = {
    team_members: TeamMembersRegistry,
    portfolio_categories: PortfolioCategoriesRegistry,
    faq: FAQRegistry,
    parallax: ParallaxRegistry,
} as const;

export type RegistryKey = keyof typeof Registries;
export type Registries = {
    [K in RegistryKey]: z.infer<typeof Registries[K]>;
};
export type Registry<K extends RegistryKey> = Registries[K];
