import { createRegistry } from "..";
import * as mediaVariants from "@server/portfolio/mediaVariants";

export const parallax = await createRegistry("parallax", {
    default: [],
    transform: async (reg) => await Promise.all(reg.map(async (value) => ({
        layers: await Promise.all(value.layers.map(async (layer) => {
            const variant = await mediaVariants.get(layer.mediaContent, "large");

            return {
                image: variant ? variant.fileUrl : "",
                width: variant ? variant.info?.width : 0,
                height: variant ? variant.info?.height : 0,
                offset: layer.offset,
                scale: layer.scale,
            };
        })),
    }))),
});
