import { FieldDescription } from "./ui/field";

/** Required by Google when the reCAPTCHA badge is hidden (see base.css). */
export function RecaptchaNotice() {
    return (
        <FieldDescription className="text-center">
            Această pagină este protejată de reCAPTCHA și se aplică{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Politica de confidențialitate
            </a>{" "}
            și{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                Termenii
            </a>{" "}
            Google.
        </FieldDescription>
    );
}
