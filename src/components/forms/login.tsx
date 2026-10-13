import { Link } from "@tanstack/react-router";
import { SplitCard } from "../cards/split";
import EnterPassword5 from "../illustrations/enter-password-5.svg?react";
import { LegalLink } from "../legal";
import { RecaptchaNotice } from "../recaptcha-notice";
import { SocialLogin } from "../social-login";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";

export function LoginForm() {
    return (
        <SplitCard
            aside={<EnterPassword5 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={
                <>
                    Continuând, ești de acord cu{" "}
                    <LegalLink document="terms">Termenii și condițiile</LegalLink> și{" "}
                    <LegalLink document="privacy">Politica de confidențialitate</LegalLink>.
                </>
            }
        >
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">Bine ai revenit</TextH1>
                        <TextP variant="muted" className="text-balance">
                            Intră în contul tău Vest Visuals.
                        </TextP>
                    </div>
                    <SocialLogin />
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        Sau cu email
                    </FieldSeparator>
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
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">Parolă</FieldLabel>
                            <Link
                                to="/account/forgot-password"
                                className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                            >
                                Ai uitat parola?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox id="remember-me" name="rememberMe" defaultChecked />
                        <FieldLabel htmlFor="remember-me" className="font-normal">
                            Ține-mă minte
                        </FieldLabel>
                    </Field>
                    <Field>
                        <Button type="submit" size="lg">
                            Intră în cont
                        </Button>
                        <RecaptchaNotice />
                    </Field>
                    <FieldDescription className="text-center">
                        Nu ai cont? <Link to="/account/signup">Creează unul</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
