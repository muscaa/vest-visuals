import { createRegistry } from "..";

export const portfolio_categories = await createRegistry("portfolio_categories", {
    default: [],
});
