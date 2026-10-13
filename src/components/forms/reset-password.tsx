import { Link } from "@tanstack/react-router";
import { SplitCard } from "../cards/split";
import ResetPassword2 from "../illustrations/reset-password-2.svg?react";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

/** Where the reset link from the email lands. */
export function ResetPasswordForm() {
    return (
        <SplitCard
            aside={<ResetPassword2 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">Alege o parolă nouă</TextH1>
                        <TextP variant="muted" className="text-balance">
                            După ce o schimbi, te poți autentifica cu noua parolă.
                        </TextP>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="password">Parolă nouă</FieldLabel>
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
                        <FieldLabel htmlFor="confirm-password">Confirmă parola</FieldLabel>
                        <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </Field>
                    <Field>
                        <Button type="submit" size="lg">
                            Schimbă parola
                        </Button>
                    </Field>
                    <FieldDescription className="text-center">
                        <Link to="/account/login">Înapoi la autentificare</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
