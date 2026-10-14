import { m } from "@shared/paraglide/messages";
import { Rich } from "./rich";
import { FieldDescription } from "./ui/field";

/** Required by Google when the reCAPTCHA badge is hidden (see base.css). */
export function RecaptchaNotice() {
    return (
        <FieldDescription className="text-center">
            <Rich
                message={m.recaptcha_notice}
                tags={{
                    privacy: ({ children }) => (
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            {children}
                        </a>
                    ),
                    terms: ({ children }) => (
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                            {children}
                        </a>
                    ),
                }}
            />
        </FieldDescription>
    );
}
