import { Link } from "@tanstack/react-router";
import { SplitCard } from "../cards/split";
import ResetPassword6 from "../illustrations/reset-password-6.svg?react";
import { RecaptchaNotice } from "../recaptcha-notice";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

export function ForgotPasswordForm() {
    return (
        <SplitCard
            aside={<ResetPassword6 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">Ai uitat parola?</TextH1>
                        <TextP variant="muted" className="text-balance">
                            Introdu adresa de email a contului și îți trimitem un link ca să-ți alegi o parolă nouă.
                        </TextP>
                    </div>
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
                        <Button type="submit" size="lg">
                            Trimite linkul
                        </Button>
                        <RecaptchaNotice />
                    </Field>
                    <FieldDescription className="text-center">
                        Ți-ai amintit parola? <Link to="/account/login">Intră în cont</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
