import { z } from "zod";

export const PortfolioCategory = z.object({
    name: z.string(),
    href: z.string(),
    cover: z.string(),
});
export type PortfolioCategory = z.infer<typeof PortfolioCategory>;

export const PortfolioCategoriesRegistry = z.array(PortfolioCategory);
export type PortfolioCategoriesRegistry = z.infer<typeof PortfolioCategoriesRegistry>;
