"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    SiYoutube,
    SiFacebook,
    SiInstagram,
    SiTiktok,
    SiX,
} from "@icons-pack/react-simple-icons";
import {
    Phone,
    Mail,
} from "lucide-react";
import { IconLink } from "@/components/snippets";

export function Footer() {
    return (
        <footer className="flex flex-col justify-center items-center min-h-20 bg-secondary">
            <h5>© {new Date().getFullYear()} Vest Visuals</h5>
            <h5>
                by <Link href="https://github.com/muscaa" target="_blank">
                    <Button variant="link" size="none" className="font-semibold text-sm">muscaa</Button>
                </Link>
            </h5>
        </footer>
    );
}

function CardLink(props: { href: string, icon: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }>, title: string, text: string }) {
    return (
        <Link href={props.href} target="_blank">
            <Button variant="card" size="none">
                <div className="flex gap-4 items-center">
                    <props.icon size={32} strokeWidth={1.5} className="size-8" />
                    <div className="flex flex-col">
                        <h4>{props.title}</h4>
                        <p className="text-muted-foreground">{props.text}</p>
                    </div>
                </div>
            </Button>
        </Link>
    );
}

export function FooterLarge() {
    return (
        <footer className="flex flex-col bg-muted">
            <div className="flex justify-between px-32 py-16">
                <div className="flex flex-col gap-2">
                    <h4 className="mb-6">UNDE NE GASESTI</h4>
                    <CardLink
                        href="tel:+40723971618"
                        icon={Phone}
                        title="Telefon"
                        text="+40 723 971 618"
                    />
                    <CardLink
                        href="mailto:contact@vestvisuals.ro"
                        icon={Mail}
                        title="E-mail"
                        text="contact@vestvisuals.ro"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="mb-6">LINKURI UTILE</h4>
                    <p>Home</p>
                    <p>Termeni si conditii</p>
                    <p>Politica de confidentialitate</p>
                    <p>Politica de cookie-uri</p>
                    <p>Statistici</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="mb-6">CONTACTEAZA-NE</h4>
                    <p className="text-muted-foreground flex-wrap max-w-80">Iti raspundem mereu intrebarilor legate de serviciile sau produsele oferite de noi.</p>
                    <div className="flex gap-4 mt-10">
                        <Button variant="outline" size="lg">APELEAZA</Button>
                        <Button size="lg">CONTACT</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between px-32 py-8 bg-keppel">
                <div className="flex items-center justify-center gap-4">
                    <IconLink href="https://youtube.com/@VestVisuals" icon={SiYoutube} />
                    <IconLink href="https://facebook.com/VestVisuals" icon={SiFacebook} />
                    <IconLink href="https://instagram.com/vest.visuals" icon={SiInstagram} />
                    <IconLink href="https://tiktok.com/@vest_visuals" icon={SiTiktok} />
                    <IconLink href="https://x.com/VestVisual" icon={SiX} />
                </div>
                <div className="flex justify-center items-center">
                    <p>Copyright © {new Date().getFullYear()} Vest Visuals - All rights reserved.
                        Made by <Link href="https://github.com/muscaa" target="_blank">
                            <Button variant="link" size="none" className="font-semibold text-sm">muscaa</Button>
                        </Link> ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}
