/**
 * TEMPORARY: the wedding fair roll-up banner, to redraw in Illustrator. Delete once it's printed.
 * 850 x 2000 mm, laid out at real size; the screen shows it scaled down, printing ("Save as PDF") gives the real size.
 * Its top stands at about 2 m, so the headline is at eye level; the bottom ~10 cm usually hides in the stand's base.
 */
import { BeautifulQRCode } from "@beautiful-qr-code/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { IconPhone, IconWorld } from "@tabler/icons-react";

export const Route = createFileRoute("/account/design/rollup/")({
    component: RouteComponent,
});

const contact = [
    { icon: IconPhone, text: "0723 971 618" },
    { icon: IconWorld, text: "media.vestvisuals.ro" },
    { icon: SiInstagram, text: "@vest.visuals" },
];

//
// the photo: solid under a diagonal, and above it the same photo in equilateral triangles that thin out, as if it
// came apart. Everything in mm, so it can be redrawn exactly; the diagonal follows the triangles' grid.
//

const banner = { width: 850, height: 2000 };
/** the contact under the photo: room above it, its own height (the QR code), and room below, where the stand's base hides 10 cm */
const contactSpace = { above: 50, content: 150, below: 120 };
/** where the photo ends, straight, on top of the contact */
const photoBottom = banner.height - contactSpace.above - contactSpace.content - contactSpace.below;
/** how much the photo, the diagonal and the triangles moved up, to make room for the contact */
const lift = 1710 - photoBottom;
/** the diagonal's height at the right edge; it slopes 30° (60° from the vertical edges), lower on the left */
const lineRight = 800 - lift;
/** the triangles' side, how many rows of them there can be, and how much each shrinks to leave a gap */
const side = 62;
const rows = 6;
const shrink = 0.82;
/** nothing above this, so the headline stays clear */
const headlineBottom = 690;
/** the photo's box: taller than the banner, so the couple sits under the diagonal */
const photo = { top: 650 - lift, height: 1900, ratio: 1366 / 2048 };

const tan30 = Math.tan(Math.PI / 6);
const triangleHeight = (side * Math.sqrt(3)) / 2;
/** along the diagonal, and across it (towards the solid part) */
const along = { x: Math.cos(Math.PI / 6), y: -Math.sin(Math.PI / 6) };
const across = { x: Math.sin(Math.PI / 6), y: Math.cos(Math.PI / 6) };
const lineLeft = lineRight + banner.width * tan30;

/** The same triangles every time, so the layout doesn't change between renders. */
function random(row: number, index: number) {
    const value = Math.sin(row * 127.1 + index * 311.7) * 43758.5453;
    return value - Math.floor(value);
}

type Point = [number, number];

function at(u: number, v: number): Point {
    return [along.x * u + across.x * v, lineLeft + along.y * u + across.y * v];
}

function shrunk(points: Point[]): Point[] {
    const center = points.reduce<Point>((sum, [x, y]) => [sum[0] + x / 3, sum[1] + y / 3], [0, 0]);
    return points.map(([x, y]) => [center[0] + (x - center[0]) * shrink, center[1] + (y - center[1]) * shrink]);
}

/**
 * How likely a triangle is to stay, by how far up from the diagonal its middle is, in rows: almost all stay just
 * above it, and the higher they are, the fewer.
 */
function kept(distance: number) {
    // nearly all stay up to about a row above the diagonal, then they thin out smoothly to none at the top
    const t = Math.min(1, Math.max(0, (distance - 0.6) / (rows - 0.6)));
    return 1 - t * t * (3 - 2 * t);
}

/** Above the diagonal: rows of triangles, each row half a triangle along from the one under it. */
function photoTriangles() {
    const length = banner.width / Math.cos(Math.PI / 6);
    const triangles: Point[][] = [];

    for (let row = 0; row < rows; row++) {
        const near = -row * triangleHeight;
        const far = near - triangleHeight;
        const offset = (row % 2) * (side / 2);

        for (let index = -2, u = offset - 2 * side; u < length + side; index++, u += side) {
            // an upward triangle's middle is a third of the row up, a downward one's two thirds
            const candidates: [Point[], number][] = [
                [[at(u, near), at(u + side, near), at(u + side / 2, far)], row + 1 / 3],
                [[at(u + side / 2, far), at(u + side * 1.5, far), at(u + side, near)], row + 2 / 3],
            ];
            candidates.forEach(([points, distance], which) => {
                const clear = points.every(([, y]) => y > headlineBottom);
                if (clear && random(row, index * 2 + which) < kept(distance)) {
                    triangles.push(shrunk(points));
                }
            });
        }
    }

    return triangles;
}

const solid: Point[] = [[0, lineLeft], [banner.width, lineRight], [banner.width, photoBottom], [0, photoBottom]];
const pointsOf = (points: Point[]) => points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

function Photo() {
    const width = photo.height * photo.ratio;

    return (
        <svg className="absolute inset-0" width="850mm" height="2000mm" viewBox={`0 0 ${banner.width} ${banner.height}`}>
            <defs>
                <clipPath id="photo-mask" clipPathUnits="userSpaceOnUse">
                    <polygon points={pointsOf(solid)} />
                    {photoTriangles().map((points, index) => <polygon key={index} points={pointsOf(points)} />)}
                </clipPath>
            </defs>
            <g clipPath="url(#photo-mask)">
                <image
                    href="/wedding/couple.png"
                    x={(banner.width - width) / 2}
                    y={photo.top}
                    width={width}
                    height={photo.height}
                    preserveAspectRatio="xMidYMid slice"
                />
            </g>
        </svg>
    );
}

function Banner(props: { guides: boolean }) {
    return (
        <div className="banner theme-light relative flex flex-col overflow-hidden bg-card text-foreground" style={{ width: "850mm", height: "2000mm" }}>
            {/* first, so the headline and the contact stay on top of it */}
            <Photo />
            <div className="relative flex flex-col items-center text-center" style={{ padding: "95mm 70mm 0" }}>
                <img src="/logos/large.svg" alt="Vest Visuals" style={{ width: "560mm" }} />
                <h1 className="font-medium" style={{ marginTop: "120mm", fontSize: "104mm", lineHeight: 0.95, letterSpacing: "-0.045em" }}>
                    Ziua voastră,
                    <br />
                    pentru
                    <br />
                    <i className="text-chart-1">totdeauna.</i>
                </h1>
            </div>
            <div className="grow" />
            {/* contact under the photo, just above the stand's base */}
            <div className="relative flex shrink-0 items-center justify-between" style={{ height: `${banner.height - photoBottom}mm`, padding: `${contactSpace.above}mm 70mm ${contactSpace.below}mm`, gap: "40mm" }}>
                <div className="flex flex-col" style={{ gap: "10mm" }}>
                    {
                        contact.map(({ icon: Icon, text }) => (
                            <span key={text} className="flex items-center font-medium" style={{ gap: "10mm", fontSize: "30mm", letterSpacing: "-0.02em" }}>
                                <Icon className="shrink-0 text-primary" style={{ width: "24mm", height: "24mm" }} />
                                {text}
                            </span>
                        ))
                    }
                </div>
                <div className="shrink-0 bg-white" style={{ width: "150mm", padding: "8mm", borderRadius: "16mm" }}>
                    <BeautifulQRCode data="https://media.vestvisuals.ro" foregroundColor="#121418" backgroundColor="#ffffff" radius={0.5} padding={0} />
                </div>
            </div>
            {
                props.guides && (
                    <div className="pointer-events-none absolute inset-0 print:hidden">
                        {/* 30 mm safe margin */}
                        <div className="absolute border-4 border-dashed border-cyan-500" style={{ inset: "30mm" }} />
                        {/* usually hidden by the stand's base */}
                        <div className="absolute inset-x-0 bottom-0 border-t-4 border-dashed border-fuchsia-500 bg-fuchsia-500/15" style={{ height: "100mm" }} />
                    </div>
                )
            }
        </div>
    );
}

function RouteComponent() {
    const [guides, setGuides] = useState(true);
    const [zoom, setZoom] = useState(0.2);

    return (
        <div className="flex-1 overflow-auto bg-neutral-200 text-neutral-900 print:overflow-visible print:bg-white">
            {/* one page at the banner's real size; only the banner gets printed */}
            <style>{"@page { size: 850mm 2000mm; margin: 0; } @media print { html, body { height: auto !important; overflow: visible !important; } body > :not(:first-child) { display: none !important; } .preview { zoom: 1 !important; } }"}</style>
            <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur border-b text-sm print:hidden">
                <span className="font-medium">Roll-up · 85 × 200 cm</span>
                <label className="flex items-center gap-2 ml-auto">
                    Zoom
                    <input type="range" min={0.1} max={1} step={0.05} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
                    {Math.round(zoom * 100)}%
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={guides} onChange={(event) => setGuides(event.target.checked)} />
                    Ghidaje (margine 3 cm, baza standului 10 cm)
                </label>
                <button type="button" onClick={() => window.print()} className="px-3 py-1.5 rounded-md bg-neutral-900 text-white">
                    Printează / PDF
                </button>
            </div>
            <div className="flex justify-center p-10 print:block print:p-0">
                <div className="preview shadow-2xl print:shadow-none" style={{ zoom }}>
                    <Banner guides={guides} />
                </div>
            </div>
        </div>
    );
}
