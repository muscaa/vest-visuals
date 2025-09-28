import { z } from "zod";
import { TeamMembersRegistry } from "./team-members";
import { PortfolioCategoriesRegistry } from "./portfolio-categories";
import { FAQRegistry } from "./faq";
import {
    ParallaxRegistryIn,
    ParallaxRegistryOut,
} from "./parallax";

function io<In extends z.ZodType, Out extends z.ZodType = In>(input: In, output?: Out) {
    return {
        in: input,
        out: (output ?? input) as Out,
    };
}

export const Registries = {
    team_members: io(TeamMembersRegistry),
    portfolio_categories: io(PortfolioCategoriesRegistry),
    faq: io(FAQRegistry),
    parallax: io(ParallaxRegistryIn, ParallaxRegistryOut),
} as const;

export type RegistryKey = keyof typeof Registries;
export type RegistryIn<K extends RegistryKey> = z.infer<typeof Registries[K]["in"]>;
export type RegistryOut<K extends RegistryKey> = z.infer<typeof Registries[K]["out"]>;
export type Registries = {
    [K in RegistryKey]: RegistryOut<K>;
};
