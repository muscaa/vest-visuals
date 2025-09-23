import { createRegistry } from "..";
import { PortfolioRegistry } from "@type/registries/portfolio";

export const portfolio: PortfolioRegistry = await createRegistry("portfolio", {
    categories: [],
});
