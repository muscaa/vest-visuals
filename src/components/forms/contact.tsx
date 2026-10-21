import { m } from "@shared/paraglide/messages";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { SplitCard, SplitCardHeader } from "../cards/split";
import Contact3 from "../illustrations/contact-3.svg?react";
import { LegalAgreement } from "../legal";
import { RecaptchaNotice } from "../recaptcha-notice";
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
    { name: m.common_email, href: `mailto:${email}`, icon: IconMail },
    { name: m.contact_phone, href: `tel:${phone}`, icon: IconPhone },
    { name: () => "WhatsApp", href: `https://wa.me/${phone.slice(1)}`, icon: SiWhatsapp },
];

export interface ContactFormProps {
    /** which division's legal pages to link */
    division?: LegalDivision;
}

export function ContactForm(props: ContactFormProps) {
    return (
        <SplitCard
            aside={<Contact3 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_contact} division={props.division} />}
        >
            <form>
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
                    <Field>
                        <Button type="submit" size="lg">
                            {m.contact_send()}
                        </Button>
                        <RecaptchaNotice />
                    </Field>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
