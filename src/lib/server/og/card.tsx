/**
 * The card shown when a page is shared, 1200×630: the page's photo with its title over it, like the media site's photo
 * tiles, or the brand's colours without a photo. Laid out by satori (flexbox only), turned into a PNG by sharp.
 */
import satori from "satori";
import sharp from "sharp";
import { cardSize } from "@shared/seo";
import interMedium from "./fonts/Inter_28pt-Medium.ttf?inline";
import interRegular from "./fonts/Inter_24pt-Regular.ttf?inline";
import monoMedium from "./fonts/JetBrainsMono-Medium.ttf?inline";
import logo from "./logo.svg?raw";

export interface Card {
    /** above the title, e.g. "Media" */
    eyebrow: string;
    title: string;
    description?: string;
    /** where the photo is; a card without one, or whose photo can't be loaded, has the brand's colours */
    photo?: string;
}

/** The theme's colours (src/styles/theme.css), worked out, since satori can't mix them. */
const colors = {
    dark: "#13151b",
    primary: "#4b71d8",
    success: "#2ac1a8",
};

/** Bundled with the server as data urls, so they're there wherever it runs. */
const fonts = [
    { name: "Inter Display", data: fontData(interMedium), weight: 500 as const },
    { name: "Inter", data: fontData(interRegular), weight: 400 as const },
    { name: "JetBrains Mono", data: fontData(monoMedium), weight: 500 as const },
];

function fontData(inline: string) {
    return Buffer.from(inline.slice(inline.indexOf(",") + 1), "base64");
}

const logoUrl = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

/** The photo, cropped to the card and as a JPEG, which satori can read (it can't read WebP); null if it can't be had. */
async function loadPhoto(url: string) {
    try {
        const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
        if (!response.ok) return null;

        const photo = await sharp(Buffer.from(await response.arrayBuffer()))
            .rotate()
            .resize(cardSize.width, cardSize.height, { fit: "cover", position: "attention" })
            .jpeg({ quality: 80 })
            .toBuffer();
        return `data:image/jpeg;base64,${photo.toString("base64")}`;
    } catch {
        return null;
    }
}

/** The text cut at a word, with an ellipsis, to stay within `max` characters; satori can't clamp lines by itself. */
function shorten(text: string, max: number) {
    if (text.length <= max) return text;
    return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "")}…`;
}

export async function renderCard(card: Card) {
    const photo = card.photo ? await loadPhoto(card.photo) : null;
    // long titles a size smaller, so they still fit in two lines
    const titleSize = card.title.length > 44 ? 60 : 72;

    const svg = await satori(
        <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: colors.dark, color: "white" }}>
            {
                photo ? (
                    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                        <img src={photo} width={cardSize.width} height={cardSize.height} />
                    </div>
                ) : (
                    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `radial-gradient(circle at 90% 10%, ${colors.primary}99 0%, transparent 55%)` }} />
                )
            }
            {
                photo ? (
                    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.85) 100%)" }} />
                ) : (
                    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `radial-gradient(circle at 100% 100%, ${colors.success}66 0%, transparent 45%)` }} />
                )
            }
            {/* inset rather than padded: satori adds padding to the size instead of taking it from it */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "absolute", top: 64, left: 64, right: 64, bottom: 64 }}>
                <img src={logoUrl} width={92} height={60} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 24, fontFamily: "JetBrains Mono", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
                        <div style={{ display: "flex", width: 40, height: 4, marginRight: 16, background: colors.primary }} />
                        {card.eyebrow}
                    </div>
                    <div style={{ display: "flex", maxWidth: 1000, fontFamily: "Inter Display", fontSize: titleSize, lineHeight: 1.05, letterSpacing: -titleSize * 0.03 }}>
                        {shorten(card.title, 80)}
                    </div>
                    {
                        card.description && (
                            <div style={{ display: "flex", maxWidth: 940, marginTop: 20, fontFamily: "Inter", fontSize: 28, lineHeight: 1.4, color: "rgba(255,255,255,0.8)" }}>
                                {/* two lines at most */}
                                {shorten(card.description, 120)}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>,
        { ...cardSize, fonts },
    );

    return sharp(Buffer.from(svg)).png().toBuffer();
}
