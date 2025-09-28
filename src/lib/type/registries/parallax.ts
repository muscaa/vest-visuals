import { z } from "zod";

// IN

export const ParallaxLayerIn = z.object({
    mediaContent: z.string(),
    offset: z.number(),
    scale: z.number(),
});
export type ParallaxLayerIn = z.infer<typeof ParallaxLayerIn>;

export const ParallaxEntryIn = z.object({
    name: z.string(),
    layers: z.array(ParallaxLayerIn),
});
export type ParallaxEntryIn = z.infer<typeof ParallaxEntryIn>;

export const ParallaxRegistryIn = z.array(ParallaxEntryIn);
export type ParallaxRegistryIn = z.infer<typeof ParallaxRegistryIn>;

// OUT

export const ParallaxLayerOut = z.object({
    image: z.string(),
    width: z.number(),
    height: z.number(),
    offset: z.number(),
    scale: z.number(),
});
export type ParallaxLayerOut = z.infer<typeof ParallaxLayerOut>;

export const ParallaxEntryOut = z.object({
    name: z.string(),
    layers: z.array(ParallaxLayerOut),
});
export type ParallaxEntryOut = z.infer<typeof ParallaxEntryOut>;

export const ParallaxRegistryOut = z.array(ParallaxEntryOut);
export type ParallaxRegistryOut = z.infer<typeof ParallaxRegistryOut>;
