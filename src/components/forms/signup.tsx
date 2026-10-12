import { Link } from "@tanstack/react-router";
import { SplitCard } from "../cards/split";
import CreateAccount1 from "../illustrations/create-account-1.svg?react";
import { RecaptchaNotice } from "../recaptcha-notice";
import { SocialLogin } from "../social-login";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";

export function SignupForm() {
    return (
        <SplitCard
            aside={<CreateAccount1 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={
                <>
                    Creându-ți un cont, ești de acord cu{" "}
                    <a href="#">Termenii și condițiile</a> și{" "}
                    <a href="#">Politica de confidențialitate</a>.
                </>
            }
        >
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">Creează-ți contul</TextH1>
                        <TextP variant="muted" className="text-balance">
                            Durează mai puțin de un minut.
                        </TextP>
                    </div>
                    <SocialLogin />
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        Sau cu email
                    </FieldSeparator>
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
                    <Field>
                        <FieldLabel htmlFor="password">Parolă</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                        <FieldDescription>Cel puțin 8 caractere.</FieldDescription>
                    </Field>
                    <Field>
                        <Button type="submit" size="lg">
                            Creează contul
                        </Button>
                        <RecaptchaNotice />
                    </Field>
                    <FieldDescription className="text-center">
                        Ai deja cont? <Link to="/account/login">Intră în cont</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
