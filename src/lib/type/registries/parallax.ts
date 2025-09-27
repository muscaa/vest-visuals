import { z } from "zod";

export const ParallaxLayer = z.object({
    mediaContent: z.string(),
    offset: z.number(),
    scale: z.number(),
});
export type ParallaxLayer = z.infer<typeof ParallaxLayer>;

export const ParallaxEntry = z.object({
    name: z.string(),
    layers: z.array(ParallaxLayer),
});
export type ParallaxEntry = z.infer<typeof ParallaxEntry>;

export const ParallaxRegistry = z.array(ParallaxEntry);
export type ParallaxRegistry = z.infer<typeof ParallaxRegistry>;
