import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
    Phone,
    Mail,
} from "lucide-react";
import {
    SiWhatsapp,
    SiYoutube,
    SiFacebook,
    SiInstagram,
    SiTiktok,
    SiX,
} from "@icons-pack/react-simple-icons";
import { Separator } from "@/components/ui/separator";

function ContactForm() {
    return (
        <Card className="w-xs lg:w-md">
            <CardHeader>
                <CardTitle>Mesaj Rapid</CardTitle>
                <CardDescription>Completeaza formularul de mai jos si vom raspunde cat de repede putem.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="name">Nume</Label>
                            <Input id="name" placeholder="Numele Tau" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" placeholder="nume@gmail.com" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="message">Mesaj</Label>
                            <Textarea id="message" placeholder="..." className="h-36" maxLength={1000} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex gap-2">
                <div className="flex-grow"></div>
                <Button variant="default">Trimite</Button>
            </CardFooter>
        </Card>
    );
}

function CardLink(props: { href: string, icon: React.ComponentType<{ size: number, strokeWidth: number }>, title: string, text: string }) {
    return (
        <Link href={props.href} target="_blank">
            <Card className="hover:text-primary transition-all p-4">
                <div className="flex gap-4 items-center">
                    <props.icon size={32} strokeWidth={1.5} />
                    <div className="flex flex-col">
                        <h4>{props.title}</h4>
                        <p className="text-muted-foreground">{props.text}</p>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

function IconLink(props: { href: string, icon: React.ComponentType<{ size: number, strokeWidth: number }> }) {
    return (
        <Link href={props.href} target="_blank" className="hover:text-primary transition-all">
            <props.icon size={24} strokeWidth={1.5} />
        </Link>
    );
}

function ContactOther() {
    return (
        <div className="w-xs lg:w-md flex flex-col gap-2">
            <CardLink
                href="tel:+40723971618"
                icon={Phone}
                title="Telefon"
                text="+40 723 971 618"
            />
            <CardLink
                href="https://api.whatsapp.com/send?phone=40723971618&text"
                icon={SiWhatsapp}
                title="WhatsApp"
                text="+40 723 971 618"
            />
            <CardLink
                href="mailto:contact@vestvisuals.ro"
                icon={Mail}
                title="E-mail"
                text="contact@vestvisuals.ro"
            />
            <Separator className="my-2" />
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <IconLink href="https://youtube.com/@VestVisuals" icon={SiYoutube} />
                <IconLink href="https://facebook.com/VestVisuals" icon={SiFacebook} />
                <IconLink href="https://instagram.com/vest.visuals" icon={SiInstagram} />
                <IconLink href="https://tiktok.com/@vest_visuals" icon={SiTiktok} />
                <IconLink href="https://x.com/VestVisual" icon={SiX} />
            </div>
        </div>
    );
}

export default function Contact() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center size-full gap-8 py-8">
            <ContactForm />
            <h4>sau</h4>
            <ContactOther />
        </div>
    );
}
