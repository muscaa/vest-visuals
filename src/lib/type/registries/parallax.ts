import { z } from "zod";

export const ParallaxLayer = z.object({
    mediaContent: z.string(),
    offset: z.number(),
    scale: z.number(),
});
export type ParallaxLayer = z.infer<typeof ParallaxLayer>;

export const ParallaxRegistry = z.array(ParallaxLayer);
export type ParallaxRegistry = z.infer<typeof ParallaxRegistry>;
