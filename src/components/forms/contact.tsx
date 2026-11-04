import { m } from "@shared/paraglide/messages";
import { useRef } from "react";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { toast } from "sonner";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { SplitCard, SplitCardHeader } from "../cards/split";
import Contact3 from "../illustrations/contact-3.svg?react";
import { LegalAgreement } from "../legal";
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
import { FormMessage, SubmitButton } from "./form-parts";
import type { LegalDivision } from "../legal";
import { useFormSubmit } from "@/hooks/form";
import { useCaptcha } from "@/hooks/captcha";
import { sendContactMessage } from "@/functions/contact";

const email = "contact@vestvisuals.ro";
const phone = "+40723971618";

const direct = [
    { name: m.common_email, href: `mailto:${email}`, icon: IconMail },
    { name: m.contact_phone, href: `tel:${phone}`, icon: IconPhone },
    { name: () => "WhatsApp", href: `https://wa.me/${phone.slice(1)}`, icon: SiWhatsapp },
];

export interface ContactFormProps {
    /** which division's legal pages to link */
    division?: LegalDivision;
}

/** The site the message is sent from, for the team to know which one it came from. */
const sites = {
    home: "vestvisuals.ro",
    media: "media.vestvisuals.ro",
    software: "software.vestvisuals.ro",
} as const;

export function ContactForm(props: ContactFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const captcha = useCaptcha();

    const { onSubmit, pending, error } = useFormSubmit(async (field) => {
        const { captcha: passed } = await captcha.withToken((token) => sendContactMessage({
            data: {
                name: field("name").trim(),
                email: field("email").trim(),
                message: field("message").trim(),
                site: sites[props.division ?? "home"],
                token,
            },
        }));
        if (!passed) {
            return m.auth_error_captcha();
        }

        formRef.current?.reset();
        toast.success(m.contact_sent());
    });

    return (
        <SplitCard
            aside={<Contact3 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_contact} division={props.division} />}
        >
            <form ref={formRef} method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <SplitCardHeader title={m.contact_title()} description={m.contact_description()} />
                    <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                        {direct.map(({ name, href, icon: Icon }) => (
                            <Button
                                key={href}
                                variant="outline"
                                size="lg"
                                nativeButton={false}
                                render={<a href={href} target="_blank" rel="noopener noreferrer" />}
                            >
                                <Icon data-icon="inline-start" />
                                {name()}
                            </Button>
                        ))}
                    </div>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        {m.contact_or_message()}
                    </FieldSeparator>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="name">{m.common_name()}</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                placeholder={m.common_your_name()}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">{m.common_email()}</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder={m.common_email_placeholder()}
                                required
                            />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="message">{m.contact_message()}</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                id="message"
                                name="message"
                                rows={5}
                                maxLength={1000}
                                placeholder={m.contact_message_placeholder()}
                                className="min-h-32"
                                required
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText>{m.contact_message_limit()}</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    {error && <FormMessage>{error}</FormMessage>}
                    <Field>
                        {captcha.widget}
                        <SubmitButton pending={pending}>{m.contact_send()}</SubmitButton>
                    </Field>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
