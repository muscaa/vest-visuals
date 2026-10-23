/**
 * TEMPORARY: the wedding fair brochure, to redraw in Illustrator. Delete once it's printed.
 * A4 landscape (297 x 210 mm) folded in two (148.5 x 210 mm). Printing ("Save as PDF") gives the exact sheet size.
 */
import { BeautifulQRCode } from "@beautiful-qr-code/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "@icons-pack/react-simple-icons";
import { IconMail, IconPhone, IconWorld } from "@tabler/icons-react";

export const Route = createFileRoute("/account/design/pliant/")({
    component: RouteComponent,
});

/** Half of the sheet, one page of the folded brochure. */
function Panel(props: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <section className={`relative flex flex-col overflow-hidden ${props.className ?? ""}`} style={{ width: "148.5mm", height: "210mm", ...props.style }}>
            {props.children}
        </section>
    );
}

/** One printed side of the sheet, always in the light theme, with the fold and the safe area as guides on screen. */
function Sheet(props: { label: string; guides: boolean; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-3 print:gap-0">
            <p className="text-sm text-neutral-500 print:hidden">{props.label}</p>
            <div className="sheet theme-light relative flex bg-card text-foreground shadow-2xl print:shadow-none" style={{ width: "297mm", height: "210mm" }}>
                {props.children}
                {
                    props.guides && (
                        <div className="pointer-events-none absolute inset-0 print:hidden">
                            {/* fold */}
                            <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-fuchsia-500" />
                            {/* 5 mm from the edges and the fold, where nothing important should go */}
                            <div className="absolute border border-dashed border-cyan-500" style={{ inset: "5mm", right: "calc(148.5mm + 5mm)" }} />
                            <div className="absolute border border-dashed border-cyan-500" style={{ inset: "5mm", left: "calc(148.5mm + 5mm)" }} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

/** Like the site's eyebrow: a small mono label and a thin line after it. */
function Label(props: { children: React.ReactNode }) {
    return (
        <div className="flex items-center" style={{ gap: "3mm" }}>
            <span className="font-mono uppercase text-muted-foreground" style={{ fontSize: "7pt", letterSpacing: "0.08em" }}>
                {props.children}
            </span>
            <span className="h-px grow bg-border" />
        </div>
    );
}

//
// outside: a filler on the left (the back), the cover on the right
//

function Back() {
    return (
        <Panel>
            <img src="/wedding/flowers.png" alt="" className="absolute inset-0 size-full object-cover" />
            <div className="relative mt-auto flex justify-center" style={{ paddingBottom: "14mm" }}>
                <img src="/logos/small-white.svg" alt="Vest Visuals" style={{ width: "14mm" }} />
            </div>
        </Panel>
    );
}

function Cover() {
    return (
        <Panel>
            <img src="/wedding/couple.png" alt="" className="absolute inset-0 size-full object-cover" />
            {/* only so the logo reads over the bright leaves */}
            <div className="absolute inset-x-0 top-0" style={{ height: "60mm", background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))" }} />
            {/* and the headline over the dark suits */}
            <div className="absolute inset-x-0 bottom-0" style={{ height: "100mm", background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.35) 45%, rgba(0,0,0,0))" }} />
            <div className="relative flex justify-center" style={{ paddingTop: "15mm" }}>
                <img src="/logos/large-white.svg" alt="Vest Visuals" style={{ width: "86mm" }} />
            </div>
            <h1 className="relative mt-auto font-medium text-white" style={{ padding: "0 14mm 15mm", fontSize: "38pt", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
                Ziua voastră,
                <br />
                pentru <i className="text-chart-1">totdeauna.</i>
            </h1>
        </Panel>
    );
}

//
// inside: the text and the prices under it on the left, the contact on the right, each with a photo
//

const packages = [
    { name: "Fotograf", description: "Pentru cei care vor doar fotografii.", price: "1100" },
    { name: "Videograf", description: "Pentru cei care vor să-și retrăiască ziua.", price: "1100" },
    { name: "Fotograf + videograf", description: "Toată ziua, foto și video, de la aceeași echipă.", price: "2000", recommended: true },
];

const contact = [
    { icon: IconPhone, label: "Telefon și WhatsApp", value: "0723 971 618" },
    { icon: IconMail, label: "Email", value: "contact@vestvisuals.ro" },
    { icon: IconWorld, label: "Web", value: "media.vestvisuals.ro" },
];

const socials = [
    { icon: SiInstagram, value: "@vest.visuals" },
    { icon: SiTiktok, value: "@vest_visuals" },
    { icon: SiYoutube, value: "@VestVisuals" },
    { icon: SiFacebook, value: "/VestVisuals" },
];

function Packages() {
    return (
        <div className="flex flex-col" style={{ gap: "4mm" }}>
            <Label>Pachete</Label>
            {
                packages.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center justify-between ${item.recommended ? "bg-primary/8 ring-1 ring-primary/25" : ""}`}
                        style={{ gap: "6mm", padding: item.recommended ? "5mm" : "2mm 5mm", borderRadius: "4mm" }}
                    >
                        <div className="flex flex-col" style={{ gap: "1mm" }}>
                            {
                                item.recommended && (
                                    <span className="font-mono uppercase text-primary" style={{ fontSize: "6pt", letterSpacing: "0.08em" }}>Recomandat</span>
                                )
                            }
                            <span className="font-medium" style={{ fontSize: "12pt", letterSpacing: "-0.015em" }}>{item.name}</span>
                            <span className="text-muted-foreground" style={{ fontSize: "7.5pt" }}>{item.description}</span>
                        </div>
                        <div className="flex shrink-0 items-baseline" style={{ gap: "1.5mm" }}>
                            <span className="font-mono text-muted-foreground" style={{ fontSize: "7pt" }}>de la</span>
                            <span className={`font-medium ${item.recommended ? "text-primary" : ""}`} style={{ fontSize: "27pt", lineHeight: 1, letterSpacing: "-0.04em" }}>
                                {item.price}€
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

function Contact() {
    return (
        <div className="flex flex-col" style={{ gap: "4mm" }}>
            <Label>Contact</Label>
            <div className="flex items-center justify-between" style={{ gap: "6mm" }}>
                <div className="flex flex-col" style={{ gap: "3mm" }}>
                    {
                        contact.map(({ icon: Icon, ...item }) => (
                            <div key={item.label} className="flex items-center" style={{ gap: "3mm" }}>
                                <span className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" style={{ width: "8.5mm", height: "8.5mm" }}>
                                    <Icon style={{ width: "4.2mm", height: "4.2mm" }} />
                                </span>
                                <div className="flex flex-col" style={{ gap: "0.4mm" }}>
                                    <span className="font-mono uppercase text-muted-foreground" style={{ fontSize: "5.5pt", letterSpacing: "0.08em" }}>{item.label}</span>
                                    <span className="font-medium" style={{ fontSize: "11pt", letterSpacing: "-0.01em" }}>{item.value}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="shrink-0 bg-white" style={{ width: "29mm", padding: "2mm", borderRadius: "3mm" }}>
                    <BeautifulQRCode data="https://media.vestvisuals.ro" foregroundColor="#121418" backgroundColor="#ffffff" radius={0.5} padding={0} />
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-border" style={{ paddingTop: "3.5mm" }}>
                {
                    socials.map(({ icon: Icon, value }) => (
                        <span key={value} className="flex items-center text-muted-foreground" style={{ gap: "1.5mm", fontSize: "8pt" }}>
                            <Icon className="text-foreground" style={{ width: "3.4mm", height: "3.4mm" }} />
                            {value}
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

function InsideLeft() {
    return (
        <Panel style={{ padding: "15mm 14mm 14mm" }}>
            <h1 className="font-medium" style={{ fontSize: "29pt", lineHeight: 0.98, letterSpacing: "-0.035em" }}>
                Nunta voastră,
                <br />
                surprinsă cum <i className="text-chart-1">trebuie.</i>
            </h1>
            <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "9pt", marginTop: "5mm", maxWidth: "112mm" }}>
                Suntem o echipă foto-video din Timișoara. Fotografiem și filmăm nunți de la pregătiri până la ultimul
                dans, discret, ca momentele să rămână naturale.
            </p>
            <div style={{ marginTop: "8mm" }}>
                <Packages />
            </div>
            <img src="/wedding/artistic.png" alt="" className="min-h-0 w-full flex-1 rounded-4xl object-cover" style={{ marginTop: "8mm" }} />
        </Panel>
    );
}

function InsideRight() {
    return (
        <Panel style={{ padding: "15mm 14mm 14mm" }}>
            <img src="/wedding/hand-in-hand.png" alt="" className="min-h-0 w-full flex-1 rounded-4xl object-cover" />
            <div style={{ marginTop: "8mm" }}>
                <Contact />
            </div>
        </Panel>
    );
}

function RouteComponent() {
    const [guides, setGuides] = useState(true);

    return (
        <div className="flex-1 overflow-auto bg-neutral-200 text-neutral-900 print:overflow-visible print:bg-white">
            {/* one printed page per side, at the sheet's exact size; only the sheets get printed */}
            <style>{"@page { size: 297mm 210mm; margin: 0; } @media print { html, body { height: auto !important; overflow: visible !important; } body > :not(:first-child) { display: none !important; } .sheet { break-after: page; } }"}</style>
            <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur border-b text-sm print:hidden">
                <span className="font-medium">Pliant târg de nunți · A4 îndoit în două (297 × 210 → 148,5 × 210 mm)</span>
                <label className="flex items-center gap-2 ml-auto">
                    <input type="checkbox" checked={guides} onChange={(event) => setGuides(event.target.checked)} />
                    Ghidaje (pliu, margine de siguranță 5 mm)
                </label>
                <button type="button" onClick={() => window.print()} className="px-3 py-1.5 rounded-md bg-neutral-900 text-white">
                    Printează / PDF
                </button>
            </div>
            <div className="flex flex-col items-center gap-12 p-10 print:block print:p-0">
                <Sheet label="Exterior: spate (stânga) și copertă (dreapta)" guides={guides}>
                    <Back />
                    <Cover />
                </Sheet>
                <Sheet label="Interior: text și prețuri (stânga), contact (dreapta)" guides={guides}>
                    <InsideLeft />
                    <InsideRight />
                </Sheet>
            </div>
        </div>
    );
}
