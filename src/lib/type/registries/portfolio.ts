import { z } from "zod";

export const PortfolioCategorySchema = z.object({
    name: z.string(),
    href: z.string(),
    cover: z.string(),
});
export type PortfolioCategory = z.infer<typeof PortfolioCategorySchema>;

export const PortfolioRegistrySchema = z.object({
    categories: z.array(PortfolioCategorySchema),
});
export type PortfolioRegistry = z.infer<typeof PortfolioRegistrySchema>;
