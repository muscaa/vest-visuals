import { IconMail, IconPhone } from "@tabler/icons-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { SplitCard } from "../cards/split";
import Contact3 from "../illustrations/contact-3.svg?react";
import { LegalLink } from "../legal";
import { RecaptchaNotice } from "../recaptcha-notice";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "../ui/input-group";
import type { LegalDivision } from "../legal";

const email = "contact@vestvisuals.ro";
const phone = "+40723971618";

const direct = [
    { name: "Email", href: `mailto:${email}`, icon: IconMail },
    { name: "Telefon", href: `tel:${phone}`, icon: IconPhone },
    { name: "WhatsApp", href: `https://wa.me/${phone.slice(1)}`, icon: SiWhatsapp },
];

export interface ContactFormProps {
    /** which division's legal pages to link */
    division?: LegalDivision;
}

export function ContactForm(props: ContactFormProps) {
    return (
        <SplitCard
            aside={<Contact3 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={
                <>
                    Trimițând un mesaj, ești de acord cu{" "}
                    <LegalLink division={props.division} document="terms">Termenii și condițiile</LegalLink> și{" "}
                    <LegalLink division={props.division} document="privacy">Politica de confidențialitate</LegalLink>.
                </>
            }
        >
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">Hai să vorbim</TextH1>
                        <TextP variant="muted" className="text-balance">
                            Ai o întrebare sau un proiect în minte? Scrie-ne și
                            îți răspundem într-o zi lucrătoare.
                        </TextP>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                        {direct.map(({ name, href, icon: Icon }) => (
                            <Button
                                key={name}
                                variant="outline"
                                size="lg"
                                nativeButton={false}
                                render={<a href={href} target="_blank" rel="noopener noreferrer" />}
                            >
                                <Icon data-icon="inline-start" />
                                {name}
                            </Button>
                        ))}
                    </div>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        Sau trimite-ne un mesaj
                    </FieldSeparator>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="name">Nume</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                placeholder="Numele tău"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="nume@exemplu.ro"
                                required
                            />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="message">Mesaj</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                id="message"
                                name="message"
                                rows={5}
                                maxLength={1000}
                                placeholder="Spune-ne pe scurt de ce ai nevoie…"
                                className="min-h-32"
                                required
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText>Maxim 1.000 de caractere</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field>
                        <Button type="submit" size="lg">
                            Trimite mesajul
                        </Button>
                        <RecaptchaNotice />
                    </Field>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
