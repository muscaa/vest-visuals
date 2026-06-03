import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const inter = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-Thin.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-ExtraLight.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-Light.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-Medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/inter/Inter_18pt-Black.ttf")),
]);
const jetbrains_mono = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-Thin.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-ExtraLight.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-Light.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-Medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-ExtraBold.ttf")),
    // readFile(join(process.cwd(), "assets/fonts/jetbrains-mono/JetBrainsMono-Black.ttf")),
]);

const color1 = "#4b71d8ff";
const color2 = "#2ac1a8ff";
const color3 = "#ebb447ff";
const color4 = "#f1414dff";
const color5 = "#929396ff";
const color5_dark = "#6e6f71ff";
const color5_light = "#adaeb1ff";

const light1 = "#fdfdfeff";
const light2 = "#f6f6f8ff";
const light3 = "#eeeef0ff";
const light4 = "#e3e5e8ff";
const light5 = "#d1d3d6ff";

const dark1 = "#212125ff";
const dark2 = "#2a2a2eff";
const dark3 = "#303034ff";
const dark4 = "#36363aff";
const dark5 = "#3d3d41ff";

export async function GET(request: Request) {
    try {
        const { origin, searchParams } = new URL(request.headers.get("x-real-url") ?? request.url);

        const dark = !searchParams.has("light");
        const title = searchParams.get("title") || "No Title";
        const subtitle = searchParams.get("subtitle");
        const logo = searchParams.get("logo") || "/logos/small.svg";
        const image = searchParams.get("image");

        const bg = dark ? dark1 : light1;
        const fg = dark ? light1 : dark1;
        const muted = dark ? color5_light : color5_dark;

        return new ImageResponse(
            (
                <div
                    tw="flex w-full h-full"
                    style={{
                        background: bg,
                        color: fg,
                    }}
                >
                    <div tw="flex flex-col justify-between w-[60%] h-full p-12">
                        <img
                            src={`${logo.startsWith("/") ? origin : ""}${logo}`}
                            tw="flex w-12 h-12 object-contain"
                            style={{
                                objectFit: "contain",
                            }}
                        />
                        <div tw="flex flex-col">
                            <p
                                tw="text-6xl tracking-tight"
                                style={{
                                    fontFamily: "sans-700",
                                }}
                            >
                                {title}
                            </p>
                            {
                                subtitle && (
                                    <p
                                        tw="text-2xl"
                                        style={{
                                            color: muted,
                                            fontFamily: "sans-400",
                                        }}
                                    >
                                        {subtitle}
                                    </p>
                                )
                            }
                        </div>
                        <div tw="flex h-12" />
                    </div>
                    {
                        image && (
                            <img
                                src={`${image.startsWith("/") ? origin : ""}${image}`}
                                tw="flex w-[40%] h-full"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        )
                    }
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    ...inter.map((value, index) => ({
                        name: `sans-${(index + 1) * 100}`,
                        data: value,
                        weight: (index + 1) * 100,
                        style: "normal",
                    } as any)),
                    ...jetbrains_mono.map((value, index) => ({
                        name: `mono-${(index + 1) * 100}`,
                        data: value,
                        weight: (index + 1) * 100,
                        style: "normal",
                    } as any)),
                ],
            }
        );
    } catch (e: any) {
        console.error(`Error generating image: ${e.message}`);

        return new Response("Failed to generate the image", {
            status: 500,
        });
    }
}
