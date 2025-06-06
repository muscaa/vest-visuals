import { Main } from "@/components/main";
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
} from "@icons-pack/react-simple-icons";

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

function CardLink(props: { href: string, icon: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }>, title: string, text: string }) {
    return (
        <Link href={props.href} target="_blank">
            <Button variant="card" size="none" className="cursor-pointer">
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
        </div>
    );
}

export default function Contact() {
    return (
        <Main>
            <div className="flex flex-col lg:flex-row items-center justify-center size-full gap-8 py-8">
                <ContactForm />
                <h4>SAU</h4>
                <ContactOther />
            </div>
        </Main>
    );
}
