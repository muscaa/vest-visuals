import { z } from "zod";

export const FAQ = z.object({
    title: z.string(),
    lines: z.array(z.string()),
});
export type FAQ = z.infer<typeof FAQ>;

export const FAQRegistry = z.array(FAQ);
export type FAQRegistry = z.infer<typeof FAQRegistry>;
